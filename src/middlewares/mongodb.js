import mongoose from 'mongoose';
import logger from '../logger';

/**
 * Return middleware that connect to a mongodb server
 *
 * @param {Object} [options={}] - Optional configuration.
 * @param {string} [options.user] - Username for the database.
 * @param {string} [options.pass] - Password for the database.
 * @param {function} [options.host] - Hostname of the mongodb server.
 * @param {function} [options.port] - Port for the connection.
 * @param {function} [options.db] - The database on witch we want to connect.
 * @return {function} Koa middleware.
 */

 const mongodb = (options = {})  => {
    let mongoUrl = `mongodb://${options.user}:${options.pass}@${options.host}:${options.port}/${options.db}`;
    let mongoOptions =
	{
        useNewUrlParser: true,
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 500 // Reconnect every 500ms
    };

    let attempts = 0;

    let createDbCallback = (err) => {
        if(!err){
            logger.info({ event: 'execute' }, `Database connection established!`);
            return;
        }
        logger.info({ event: 'execute' }, err);
        attempts++;
        logger.info({ event: 'execute' }, `Mongo connection attempts: ${attempts}`);
        setTimeout(() =>{
            mongoose.connect(mongoUrl, mongoOptions,(error)=>{
                createDbCallback(error);
            });
        },2000);
    };

    createDbCallback("Mongo connection first attempt");

    let db = mongoose.connection;

    db.on('connected', () => {
        logger.info({ event: 'execute' }, `MongoDB connected!`);
    })

    db.on('open',()=>{
        logger.info({ event: 'execute' }, `MongoDB connection opened!`);
    })

    db.on('disconnected',()=>{
        logger.info({ event: 'execute' }, `MongoDB disconnected!`);
    })

    db.on('reconnected',()=>{
        logger.info({ event: 'execute' }, `MongoDB reconnected!`);
    })

    return async (ctx, next) => {
        await next();
    }
 }

 export default mongodb;