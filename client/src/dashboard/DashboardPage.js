import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Charts from './Charts';
import Notifications from './Notifications';
import Highlights from './Highlights';
import useMonitoringData from './useMonitoringData';
import useNotifications from './useNotifications';
import socket from '../socket-connection';

function DashboardPage() {
    const [data] = useMonitoringData();
    const [notifications] = useNotifications([]);

    // Let's tell the server the client is ready to receive monitoring data.
    useEffect(() => {
        console.info('WS: Ready to receive data');
        socket.emit('cpu-load:ready-to-receive');
    }, []);

    return (
        <Box m={4}>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Box mb={1}>
                        <Typography variant="h6">Key figures</Typography>
                    </Box>
                    <Highlights data={data} notifications={notifications} />

                    <Box mt={3} mb={1}>
                        <Typography variant="h6">Last 10 minutes</Typography>
                    </Box>
                    <Paper>
                        <Charts data={data} />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Box mb={1}>
                        <Typography variant="h6">
                            Notifications history
                        </Typography>
                    </Box>
                    <Paper>
                        <Notifications notifications={notifications} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DashboardPage;
