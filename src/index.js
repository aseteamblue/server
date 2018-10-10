import Koa from 'koa';

import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import errorHandler from './middlewares/errorHandler';
import logMiddleware from './middlewares/log';
import logger from './logger';
import requestId from './middlewares/requestId';
import responseHandler from './middlewares/responseHandler';
import router from './routes';
import config from './config';
import dbconfig from './config/mongoose';

import mongodb from './middlewares/mongodb';

const app = new Koa();

app.proxy = true;

app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
);
app.use(requestId());
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id']
  })
);

app.use(responseHandler());
app.use(errorHandler());
app.use(logMiddleware({ logger }));

app.use(router.routes());
app.use(router.allowedMethods());

function onError(err, ctx) {
  if (ctx == null) { logger.error({ err, event: 'error' }, 'Unhandled exception occured'); }
}

// Handle uncaught errors
app.on('error', onError);

// Database configuration
app.use(mongodb({
  user: dbconfig.dbuser,
  pass: dbconfig.dbpassword,
  host: dbconfig.dbhost,
  port: dbconfig.dbport,
  db: dbconfig.db
}));

// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info({ event: 'execute' }, `API server listening on ${config.host}:${config.port}, in ${config.env}`);
  });
  server.on('error', onError);
}

// Expose app
export default app;
