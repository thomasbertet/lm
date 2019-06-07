import Grid from '@material-ui/core/Grid';
import React from 'react';
import { distanceInWordsToNow } from 'date-fns';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import { Check, ErrorOutline } from '@material-ui/icons';

const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const useStyles = makeStyles(theme => ({
    card: {
        textAlign: 'center',
    },
    subheader: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    content: {
        color: theme.palette.primary.dark,
    },

    errorStatus: {
        ...statusStyle,
        color: theme.palette.error.main,
    },
    successStatus: {
        ...statusStyle,
        color: 'green',
    },
    statusIcon: {
        marginRight: theme.spacing(1),
    },
}));

const placeholderText = 'Waiting for data';

function getFirstTime(data) {
    return Array.isArray(data) && data.length > 0
        ? new Date(data[0].time)
        : new Date();
}

function round(number) {
    return Math.round(number * 100) / 100;
}

function getGlobalAverageAndMax(data) {
    if (!Array.isArray(data) || data.length < 1) {
        // Placeholders.
        return { globalAvg: placeholderText, maxAvg: placeholderText };
    }

    let maxAvg = 0;
    let maxAvgTime;

    const total = data.reduce((accu, { avg = 0, time }) => {
        if (avg > maxAvg) {
            maxAvg = avg;
            maxAvgTime = time;
        }
        return accu + avg;
    }, 0);

    const globalAvg = total / data.length;

    return {
        globalAvg: round(globalAvg),
        maxAvg: round(maxAvg),
        maxAvgTime,
    };
}

function Highlights({ data, notifications }) {
    const distanceFromNow = distanceInWordsToNow(getFirstTime(data));
    const { globalAvg, maxAvg, maxAvgTime } = getGlobalAverageAndMax(data);

    const lastNotification = notifications[notifications.length - 1];
    const peakSubheader = maxAvgTime
        ? distanceInWordsToNow(maxAvgTime) + ' ago'
        : '-';
    const statusSubheader = lastNotification
        ? `since ${distanceInWordsToNow(new Date(lastNotification.time))}`
        : '-';

    const classes = useStyles();

    return (
        <section>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardHeader
                            classes={{ subheader: classes.subheader }}
                            title="Average load"
                            subheader={'since ' + distanceFromNow}
                        />
                        <Box mx={4}>
                            <Divider />
                        </Box>
                        <CardContent className={classes.content}>
                            <Typography variant="h5" component="p">
                                {globalAvg}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardHeader
                            classes={{ subheader: classes.subheader }}
                            title="Load peak"
                            subheader={peakSubheader}
                        />
                        <Box mx={4}>
                            <Divider />
                        </Box>
                        <CardContent className={classes.content}>
                            <Typography variant="h5" component="p">
                                {maxAvg}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardHeader
                            classes={{ subheader: classes.subheader }}
                            title="Current status"
                            subheader={statusSubheader}
                        />
                        <Box mx={4}>
                            <Divider />
                        </Box>
                        <CardContent className={classes.content}>
                            <Typography variant="h5" component="div">
                                {lastNotification &&
                                lastNotification.average ? (
                                    <div className={classes.errorStatus}>
                                        <ErrorOutline
                                            className={classes.statusIcon}
                                        />
                                        HIGH LOAD
                                    </div>
                                ) : (
                                    <div className={classes.successStatus}>
                                        <Check className={classes.statusIcon} />
                                        NORMAL
                                    </div>
                                )}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </section>
    );
}

export default Highlights;
