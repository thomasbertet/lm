export const COLLECTING_DATA_INTERVAL = 10; // 10s.
export const NOTIFICATION_CUMULATED_THRESHOLD = 120; // 2 min
export const NB_INTERVAL_FOR_NOTIFICATION =
    NOTIFICATION_CUMULATED_THRESHOLD / COLLECTING_DATA_INTERVAL; // We must check the last NB_INTERVAL_FOR_NOTIFICATION items to determine if we should alert or not.
export const AVERAGE_NOTIFICATION_THRESHOLD = 1;