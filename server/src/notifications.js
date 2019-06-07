import { io } from './engine';
import {
    AVERAGE_NOTIFICATION_THRESHOLD,
    NB_INTERVAL_FOR_NOTIFICATION,
} from './constants';
import { addNotification, getMonitoringData, getNotifications } from './store';

// Holds current status of alerting (if an "high-load" alert is currently active)
function isCurrentlyInHighLoad() {
    const notifications = getNotifications();
    return (
        notifications.length > 0 &&
        notifications[notifications.length - 1].type === 'high-load'
    );
}

export function triggerNotificationIfNecessary() {
    // Let's first check if there is an high-load.
    const { isHighloaded, average, time } = checkIfServerIsHighLoaded();

    if (!isCurrentlyInHighLoad()) {
        // We check if we should send an "overload" notif.
        if (isHighloaded) {
            sendAndSaveHighLoadNotification({ average, time });
        }
    } else {
        // We check if we should send an "recover" notif.
        if (!isHighloaded) {
            sendAndSaveRecoverNotification({ time });
        }
    }
}

export function checkIfServerIsHighLoaded() {
    const monitoringData = getMonitoringData();

    if (monitoringData.length < NB_INTERVAL_FOR_NOTIFICATION) {
        return { isHighloaded: false, average: 0, time: new Date().getTime() };
    }

    // Check latest averages.
    // First we pick the last NB_INTERVAL_FOR_ALERT items (representing 2minutes of data)
    const latestItems = monitoringData.slice(-NB_INTERVAL_FOR_NOTIFICATION);

    // Then we sum it up
    const totalAverage = latestItems.reduce((accu, item) => {
        return accu + item.avg;
    }, 0);

    // The calculate the 2min wide average.
    const last2minAverage = totalAverage / latestItems.length;

    // Returns the calculation as well as a flag indicating if the result is above the threshold
    return {
        isHighloaded: last2minAverage > AVERAGE_NOTIFICATION_THRESHOLD,
        average: last2minAverage,
        time: latestItems[latestItems.length - 1].time,
    };
}

function sendAndSaveHighLoadNotification({ average, time }) {
    const notification = {
        type: 'high-load',
        average,
        time,
    };
    addNotification(notification);
    io.emit('cpu-load:notification-update', notification);
}

function sendAndSaveRecoverNotification({ time }) {
    const notification = { type: 'recover', time: new Date().getTime() };
    addNotification(notification);
    io.emit('cpu-load:notification-update', notification);
}

export function sendInitialNotifications() {
    // Let's init the client with data
    io.emit('cpu-load:notification-init', getNotifications());
}
