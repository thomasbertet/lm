import { addSeconds, subMinutes, setSeconds, setMilliseconds } from 'date-fns';
import monitor from './monitor';

const precision = 100; // 2 decimals

function getDateInPast() {
    return setSeconds(
        setMilliseconds(subMinutes(new Date('1995-12-17T03:24:00'), 10), 0),
        0
    );
}

export function getSampleMonitoringData(nbOfItems, average) {
    const data = [];
    const startTime = getDateInPast();

    for (let i = 0; i < nbOfItems; i++) {
        data.push({
            avg: average,
            time: addSeconds(startTime, i * 10).getTime(),
        });
    }

    return data;
}

function getRandomLowLoad() {
    return (
        Math.floor(
            Math.random() * (2 * precision - precision) + 0.1 * precision
        ) / precision
    );
}

function getRandomOverload() {
    return Math.floor(Math.random() * 100 + 100) / 100;
}

function generateInitialMonitoringData() {
    const initialData = [];
    const startTime = setSeconds(
        setMilliseconds(subMinutes(new Date(), 10), 0),
        0
    );

    for (let i = 0; i < 60; i++) {
        let average = 0;

        // Generates three notifications - two "high-load" & one "recover".
        if (i <= 18 || i === 20 || i > 50) {
            average = getRandomOverload();
        } else {
            average = getRandomLowLoad();
        }

        initialData.push({
            avg: average,
            time: addSeconds(startTime, i * 10).getTime(),
        });
    }

    return initialData;
}

export async function initStoreWithSampleData() {
    const sampleData = generateInitialMonitoringData();

    for (let i = 0; i < sampleData.length; i++) {
        // When calling process, the store will be populated just like when the app is running.
        await monitor.process(sampleData[i]);
    }
}
