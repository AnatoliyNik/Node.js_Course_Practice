const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middleware/error-handler');

const {server} = require('./data/constants');

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(server.port, () => {
  console.log(`Server is running at ${server.url}`);
});

