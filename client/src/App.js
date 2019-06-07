import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from '@reach/router';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import DashboardPage from './dashboard/DashboardPage';
import Header from './header/Header';

let theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green,
    },
});
theme = responsiveFontSizes(theme);

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            {/* Provides CSS reset styles. */}
            <CssBaseline />
            <Header />
            <Router>
                <DashboardPage path="/" />
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
