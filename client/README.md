# LM - client

When launching with `yarn start`, initial data are sent by the server.
These represent data the server (and its persistent store in a real-world) stored.

The client is quite dumb as it does not contains any logic. It receives two kinds of data: 
- "initial" data (array of monitoring items or notifications)
- "update" data (single monitoring item or notification)

During its lifetime, the client typically receives initial data at first, and every 10s an "update" data.
 
It collects all the monitoring data & notifications in simple arrays, that are used by the `Charts`, `Highlights` & `Notifcations` components to visually display the load situation.

A monitoring item is simply an object with two keys: "average" and "time".
A notification is an object with three keys: "type" (_recover_ or _high-load_), an "average" and a "time".

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test` or `yarn test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
