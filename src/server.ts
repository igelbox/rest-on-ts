import './controllers/k8s';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from './routes';

import swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../dist/swagger.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);

app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message || 'Internal error',
    type: err && err.constructor && err.constructor.name,
    data: err.fields,
  });
});

console.log('Starting server ...');
app.listen(8080, (error) => {
  if (error) {
    console.error('Cannot start server', error);
    return;
  }
  console.log('Server is running');
});
