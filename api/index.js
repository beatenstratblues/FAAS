const express = require('express');
const  { globalErrorHandler } = require('./shared/middleware/errorHandlingMiddleware');
const AppError = require("./shared/utils/errors");
const app = express();

app.get('/', (req, res) => {
  throw new AppError("This is a test error", 404);
  res.send('Hello World From Docker!')
});

app.use(globalErrorHandler);

module.exports = app;