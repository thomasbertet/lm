import { addMonitoringItem, getMonitoringData } from './store';

import {
    sendInitialNotifications,
    triggerNotificationIfNecessary,
} from './notifications';
import { io } from './engine';

async function sendMonitoringDataUpdate(monitoringItem) {
    // Send it.
    io.emit('cpu-load:update', monitoringItem);
}

function sendInitialMonitoringData() {
    // Let's init the client with data
    io.emit('cpu-load:init', getMonitoringData());
}

async function process(monitoringItem) {
    // Store it
    await addMonitoringItem(monitoringItem);

    // Make sure we update monitoring data before sending notifications.
    // Otherwise it might not be consistent between visual data & notification.
    await sendMonitoringDataUpdate(monitoringItem);

    triggerNotificationIfNecessary();
}

function sendInitialData() {
    // Send all the monitoring data we have.
    sendInitialMonitoringData();

    // Send initial notifications
    sendInitialNotifications();
}

export default {
    process,
    sendInitialData,
};
