import mongoose from 'mongoose';
import logger from '../logger';

import user from '../models/user';
import session from '../models/session';
import trophy from '../models/trophy';
import thingy from '../models/thingy';

/**
 * Return middleware that connect to a mongodb server
 *
 * @param {Object} [options={}] - Optional configuration.
 * @param {string} [options.user] - Username for the database.
 * @param {string} [options.pass] - Password for the database.
 * @param {string} [options.host] - Hostname of the mongodb server.
 * @param {string} [options.port] - Port for the connection.
 * @param {string} [options.db] - The database on witch we want to connect.
 * @return {function} Koa middleware.
 */

const mongodb = (options = {})  => {
  let mongoUrl = `mongodb://${options.user}:${options.pass}@${options.host}:${options.port}/${options.db}`;
  let mongoOptions =
    {
      useNewUrlParser: true,
      // Never stop trying to reconnect
      reconnectTries: Number.MAX_VALUE,
      // Reconnect every 500ms
      reconnectInterval: 500,
    };

  let attempts = 0;

  let createDbCallback = (err) => {
    if(!err) {
      logger.info({ event: 'execute' }, 'Database connection established!');
      return;
    }
    logger.info({ event: 'execute' }, err);
    attempts++;
    logger.info({ event: 'execute' }, `Mongo connection attempts: ${attempts}`);
    setTimeout(() =>{
      mongoose.connect(mongoUrl, mongoOptions, (error)=>{
        createDbCallback(error);
      });
    }, 2000);
  };

  createDbCallback('Mongo connection first attempt');

  let db = mongoose.connection;

  db.on('connected', () => {
    logger.info({ event: 'execute' }, 'MongoDB connected!');

    // Create the models after connection to the databas
    mongoose.model('User', user);
    mongoose.model('Session', session);
    mongoose.model('Trophy', trophy);
    mongoose.model('Thingy', thingy);
  });

  db.on('open', ()=>{
    logger.info({ event: 'execute' }, 'MongoDB connection opened!');
  });

  db.on('disconnected', ()=>{
    logger.info({ event: 'execute' }, 'MongoDB disconnected!');
  });

  db.on('reconnected', ()=>{
    logger.info({ event: 'execute' }, 'MongoDB reconnected!');
  });

  return async (ctx, next) => {
    await next();
  };
};

export default mongodb;
