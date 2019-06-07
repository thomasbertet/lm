import { format } from 'date-fns';
import React from 'react';

export function formatTick(time) {
    return format(new Date(time), 'HH:mm');
}
export function formatTooltipLabel(time) {
    return format(new Date(time), 'DD/MM/YYYY - HH:mm');
}

export function formatTooltipContent(value, name) {
    return [value.toFixed(2), 'Average load'];
}

export function CustomizedLabel({ viewBox }) {
    return (
        <text
            x={viewBox.x}
            y={viewBox.y}
            dy={-5}
            dx={10}
            textAnchor="start"
            fill="red"
        >
            High-load limit
        </text>
    );
}

export function generateTicksForEachMinute(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return {
            domain: [0, 0],
            ticks: [],
        };
    }
    const ticks = [];
    let lastMinute = 0;
    data.forEach(item => {
        const currentMinute = formatTick(item.time);
        if (currentMinute !== lastMinute) {
            lastMinute = currentMinute;
            ticks.push(item.time);
        }
    });
    return { domain: [data[0].time, data[data.length - 1].time], ticks };
}
