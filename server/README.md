# LM - Server

When launching with `yarn start`, initial data are generated and sent to the client. 
Note: When restarting the server, since we do not have a persistent datastore, sample data are re-randomly generated.

Main parts of the server: 
- Notifications: the main idea is to check on every load acquisition, that a notification can be send (either to recover or to trigger a high-load message).
- Load acquisition: Every 10s, we store what we call a monitoring item (with average & time).

A monitoring item is simply an object with two keys: "average" and "time".
A notification is an object with three keys: "type" (_recover_ or _high-load_), an "average" and a "time".

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the server on port **3001**

### `npm test` or `yarn test`

Launches `jest` against test suite.
