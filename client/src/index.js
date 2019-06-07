/*
Load monitoring web application
Create a simple web application that monitors load average on your machine:

# Websocket - NodeJS
Collect the load averages of your system (see examples below)
Display in the application the key statistics as well as a history of load over the past 10 minutes in 10s intervals.
Make sure a user can keep the web page open and monitor the load on their machine.

# Recharts
We’d suggest a graphical representation like a timeseries. Make it easy for the end-user to picture the situation!

# Notifications
Whenever the load for the past 2 minutes exceeds 1 on average, add a message saying that “High load generated an alert - load = {value}, triggered at {time}”
Whenever the load average drops again below 1 on average for the past 2 minutes, Add another message explaining when the alert recovered.
Make sure all messages showing when alerting thresholds are crossed remain visible on the page for historical reasons.

# Jest
Write a test for the alerting logic

# README
Explain how you’d improve on this application design


This exercise is oriented towards showcasing your frontend skills, there is no need for advanced backends capable of persisting data
The examples below retrieve a normalized load average in the last minute. For this exercise, this will be considered the load average of the system.
// node cpus = os.cpus().length // in the land of multi-cpu computers the avg needs to be normalized by number of CPUs avg = os.loadavg()[0]/cpus
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
