import os from 'os';
import { http, io } from './engine';
import { COLLECTING_DATA_INTERVAL } from './constants';
import monitor from './monitor';
import { initStoreWithSampleData } from './sample-data';

const PORT = 3001;

export function getAverage() {
    const cpus = os.cpus().length; // in the land of multi-cpu computers the avg needs to be normalized by number of CPUs
    return os.loadavg()[0] / cpus;
}

function onInterval() {
    // Create monitoring item.
    const monitoringItem = {
        avg: getAverage(),
        time: new Date().getTime(),
    };

    // Process it
    monitor.process(monitoringItem);
}

async function start() {
    // When we first start the server, there is no history of monitoring item (we do not use any persistent datastore)
    // Soooo, let's get some sample data in the store.
    if (process.env.WITH_INITIAL_DATA) {
        await initStoreWithSampleData();
    }

    io.on('connection', function(socket) {
        socket.on('cpu-load:ready-to-receive', function() {
            // Logging for debugging purposes.
            console.log("WS: client is ready. Let's send initial data");

            // One shot when a client connects.
            // We send all the data we have in store.
            monitor.sendInitialData();
        });

        // Just loggin' for debugging purposes.
        socket.on('disconnect', function() {
            console.log('WS: client has disconnected');
        });
    });

    // Let's iterate each 10s to send appropriate data to client.
    // Each time, we will also have to check if we need to send a notification
    setInterval(onInterval, COLLECTING_DATA_INTERVAL * 1000); // milliseconds
}

http.listen(PORT, function() {
    start().then(() => {
        console.log('Load Monitor : successfully started on *:' + PORT);
    });
});
