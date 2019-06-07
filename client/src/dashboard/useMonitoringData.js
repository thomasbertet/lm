import { useState, useEffect, useCallback } from 'react';

import socket from '../socket-connection';

const HISTORY_POINTS = 10 * 6; // 10s intervals means 6 points per minutes, multiplied by 10 minutes.

function ensureArray(data) {
    return Array.isArray(data) ? data : [];
}

function useMonitoringData(initialValue) {
    const [data, updateData] = useState(initialValue);

    const handleUpdateData = useCallback(
        receivedData => {
            console.info('WS: Received updated data', receivedData);
            updateData(
                [...ensureArray(data), receivedData].slice(-HISTORY_POINTS)
            ); // Only keep last HISTORY_POINTS.
        },
        [data]
    );

    const handleInitData = useCallback(initData => {
        console.info('WS: Received initial monitoring data', initData);
        updateData(initData.slice(-HISTORY_POINTS)); // Only keep last HISTORY_POINTS.
    }, []);

    useEffect(() => {
        socket.on('cpu-load:update', handleUpdateData);
        socket.on('cpu-load:init', handleInitData);

        return () => {
            socket.off('cpu-load:update', handleUpdateData);
            socket.off('cpu-load:init', handleInitData);
        };
    }, [handleInitData, handleUpdateData]);

    return [data];
}

export default useMonitoringData;
