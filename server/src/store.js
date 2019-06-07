// In-memory store.
const dataStore = { monitoringData: [], notifications: [] };

export function initStore({ monitoringData, notifications }) {
    dataStore.monitoringData = monitoringData;
    dataStore.notifications = notifications;
}

export function addToStore(namespace, item) {
    dataStore[namespace].push(item);
}

export function getFromStore(namespace) {
    return dataStore[namespace];
}

export function getNotifications() {
    return getFromStore('notifications');
}

export function getMonitoringData() {
    return getFromStore('monitoringData');
}

export function addNotification(notification) {
    return addToStore('notifications', notification);
}

export function addMonitoringItem(item) {
    return addToStore('monitoringData', item);
}
