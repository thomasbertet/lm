import React from 'react';
import PropTypes from 'prop-types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import Box from '@material-ui/core/Box';
import useTheme from '@material-ui/core/styles/useTheme';

import {
    CustomizedLabel,
    formatTick,
    formatTooltipLabel,
    formatTooltipContent,
    generateTicksForEachMinute,
} from './utils/charts';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const timeLabel = {
    value: 'Time',
    angle: 0,
    position: 'bottom',
};

const cpuLabel = {
    value: 'CPU load',
    angle: -90,
    position: 'insideLeft',
};

const lineMargins = {
    top: 5,
    right: 40,
    left: 20,
    bottom: 30,
};

const useStyles = makeStyles(theme => ({
    loader: {
        height: 300,
        padding: theme.spacing(2),
    },
}));

function Charts({ data }) {
    const { domain, ticks } = generateTicksForEachMinute(data);
    const theme = useTheme();
    const classes = useStyles();

    if (!data) {
        return (
            <Grid
                container
                alignItems="center"
                justify="center"
                className={classes.loader}
            >
                <Grid item data-testid="loader">
                    <CircularProgress />
                </Grid>
            </Grid>
        );
    }
    return (
        <Box pt={2}>
            <ResponsiveContainer height={500}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={lineMargins}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="number"
                        domain={domain}
                        dataKey="time"
                        ticks={ticks}
                        tickFormatter={formatTick}
                        label={timeLabel}
                    />
                    <YAxis label={cpuLabel} />
                    <Tooltip
                        formatter={formatTooltipContent}
                        labelFormatter={formatTooltipLabel}
                    />
                    <ReferenceLine
                        ifOverflow="extendDomain"
                        y={1.0}
                        label={<CustomizedLabel />}
                        stroke="red"
                        strokeDasharray="5 5"
                    />
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="avg"
                        stroke={theme.palette.primary.main}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}

Charts.propTypes = {
    data: PropTypes.array,
};

export default Charts;
