import { useState, useEffect, useCallback } from 'react';

import socket from '../socket-connection';

function useNotifications(initialValue) {
    const [notifications, updateNotifications] = useState(initialValue);

    const onUpdateNotification = useCallback(
        receivedNotification => {
            console.info('WS: Received new notification', receivedNotification);
            updateNotifications([...notifications, receivedNotification]);
        },
        [notifications]
    );

    const onInitNotifications = useCallback(initialNotifications => {
        console.info(
            'WS: Received initial notifications',
            initialNotifications
        );
        updateNotifications(initialNotifications);
    }, []);

    useEffect(() => {
        socket.on('cpu-load:notification-update', onUpdateNotification);
        socket.on('cpu-load:notification-init', onInitNotifications);

        return () => {
            socket.off('cpu-load:notification-update', onUpdateNotification);
            socket.off('cpu-load:notification-init', onInitNotifications);
        };
    }, [onInitNotifications, onUpdateNotification]);

    return [notifications];
}

export default useNotifications;
