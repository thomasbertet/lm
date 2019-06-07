import React, { Fragment } from 'react';
import { format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import { ErrorOutline, Check } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    checkIcon: {
        color: 'green',
    },
}));

function Notifications({ notifications }) {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {notifications.map(({ type, time, average }, idx) => {
                const isHighLoad = type === 'high-load';
                const date = format(new Date(time), 'DD/MM/YYYY HH:mm');
                const load = isHighLoad ? average.toFixed(2) : '-';
                return (
                    <Fragment key={time}>
                        <ListItem>
                            <ListItemAvatar>
                                {isHighLoad ? (
                                    <ErrorOutline
                                        fontSize="large"
                                        color="error"
                                    />
                                ) : (
                                    <Check
                                        fontSize="large"
                                        className={classes.checkIcon}
                                    />
                                )}
                            </ListItemAvatar>
                            {isHighLoad ? (
                                <ListItemText
                                    primary={`High load generated an alert - load = ${load}`}
                                    secondary={`triggered at ${date}`}
                                />
                            ) : (
                                <ListItemText
                                    primary="Recovered from high-load"
                                    secondary={`since ${date}`}
                                />
                            )}
                        </ListItem>
                        {idx !== notifications.length - 1 && <Divider />}
                    </Fragment>
                );
            })}
            {notifications.length <= 0 && (
                <ListItem>
                    <i>No notifications</i>
                </ListItem>
            )}
        </List>
    );
}

export default Notifications;
