# Design

## High-level
- The client is only responsible for displaying monitoring data & notifications. It does not handle notification logic nor average calculation.
- The server holds all the logic for generating notifications and average data. (that we will call monitoring data)

- On the client side, the main dashboard is composed of three sections: 
  - The key figures (max load, current status & global average)
  - The last 10 minutes data displayed on a timeseries chart
  - The notification history
  
- The client / server real-time communication is done through a Web Socket. (using socket.io)
- The server generates notifications & monitoring data, and send them through.

- When the client starts (ie. we load the page in the browser), the server is sending all its monitoring data, as well as all the notifications it has.
- When the server starts, we generate initial monitoring data & notifications so that we have something to show on the client side.

## Low-level
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- I used React v16.8 so I can use hooks
- Web sockets are handled using `socket.io`.
- `material-ui` v4 is used for the main UI components.
- Charts are generated using `recharts`.
- Tests are run using `jest` and `react-testing-library` (+ some jest-dom helpers)
- I did not used any state manager other than React' own state because I did not felt the need. In a more real-world app where data are shared across more components and at different levels of nesting, we might feel the need for a `redux` like state manager.

# Proposed design improvements

### Charts
We could add a zoom functionality to be able to look closer at some points in time.
We could select the time span of the whole chart, to let the user choose the one he's interested in.

### Notifications
We could add the ability to clear the notifications that are too old or to clear them manually.
When clicking on a notification, we could be able to display in the chart the period of time when the high-load notification was active.

### Key figures
We might add something like 90-percentile average load so that we strip off extreme values. 

### Monitoring 
Additionally to the web client, we might as well send e-mail & SMS or event Slack messages to people responsible for the server when a high-load notification is created.
Also, we may want to consider using another NodeJS API to retrieve the load average, as the `os.loadavg` method does not work on _Windows_ properly.

See README's in **client** & **server** directories for a bit more technical information & how to run the client & server.
