/* eslint-env jest */

import { NB_INTERVAL_FOR_NOTIFICATION } from '../constants';
import monitor from '../monitor';
import { getMonitoringData, getNotifications, initStore } from '../store';
import { getSampleMonitoringData } from '../sample-data';

describe('will call iteratively monitor.process with item', () => {
    afterEach(() => {
        initStore({ monitoringData: [], notifications: [] });
    });

    it('should generate one notification', async () => {
        // Let's make data to generate a notification (we force the average of all data at 1.5)
        const fakeMonitoringData = getSampleMonitoringData(
            NB_INTERVAL_FOR_NOTIFICATION,
            1.5
        );

        // Let's call doMonitor, just like it would be called in the setInterval call.
        for (let i = 0; i < fakeMonitoringData.length; i++) {
            const item = fakeMonitoringData[i];
            await monitor.process(item);
        }

        const notifications = getNotifications();
        const monitoringData = getMonitoringData();

        expect(monitoringData.length).toBe(NB_INTERVAL_FOR_NOTIFICATION);
        expect(notifications.length).toBe(1);
        expect(notifications[0].average).toBe(1.5);
    });

    it('should NOT generate any notification', async () => {
        // Let's make data to generate a notification (we force the average of all data at 1.5)
        const fakeMonitoringData = getSampleMonitoringData(
            NB_INTERVAL_FOR_NOTIFICATION,
            0.99
        );

        // Let's call doMonitor, just like it would be called in the setInterval call.
        for (let i = 0; i < fakeMonitoringData.length; i++) {
            const item = fakeMonitoringData[i];
            await monitor.process(item);
        }

        const notifications = getNotifications();
        const monitoringData = getMonitoringData();

        expect(monitoringData.length).toBe(NB_INTERVAL_FOR_NOTIFICATION);
        expect(notifications.length).toBe(0);
    });

    it('should generate high-load & recover notifications', async () => {
        // Let's make data to generate a notification (we force the average of all data at 1.5)
        const fakeMonitoringDataWithHighLoad = getSampleMonitoringData(
            NB_INTERVAL_FOR_NOTIFICATION,
            2
        );

        const fakeMonitoringDataWithLowLoad = getSampleMonitoringData(
            NB_INTERVAL_FOR_NOTIFICATION,
            0.45
        );

        const items = [
            ...fakeMonitoringDataWithHighLoad,
            ...fakeMonitoringDataWithLowLoad,
        ];

        // Let's call doMonitor, just like it would be called in the setInterval call.
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            await monitor.process(item);
        }

        const notifications = getNotifications();
        const monitoringData = getMonitoringData();

        expect(monitoringData.length).toBe(NB_INTERVAL_FOR_NOTIFICATION * 2);
        expect(notifications.length).toBe(2);
        expect(notifications[0].type).toBe('high-load');
        expect(notifications[0].average).toBe(2);
        expect(notifications[1].type).toBe('recover');
    });
});
