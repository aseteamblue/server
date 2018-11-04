'use strict';
import Session from '../models/session';
import Thingy from '../models/thingy';
import configThingy from '../config/thingy';

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get all the sessions from the database.
 *     operationId: getSessions
 *     responses:
 *       200:
 *         description: List of sessions.
 */
const getSessions = async (ctx) => {
  let sessions = await Session.find({});
  if (sessions) {
    ctx.body = sessions;
    ctx.status = 200;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the session corresponding to the given ID.
 *     operationId: getSession
 *     responses:
 *       200:
 *         description: Session.
 */
const getSessionByID = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  let session = await Session.findOne({ id: sessionID });
  if (session) {
    ctx.body = session;
    ctx.status = 200;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the temperatures corresponding to a given session.
 *     operationId: getSessionTemperatures
 *     responses:
 *       200:
 *         description: List of temperatures.
 */
const getSessionTemperatures = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  let temperatures = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.temperature.characteristicUUID });
  if (temperatures) {
    ctx.body = temperatures;
    ctx.status = 200;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the humidities corresponding to a given session.
 *     operationId: getSessionHumidities
 *     responses:
 *       200:
 *         description: List of humidities.
 */
const getSessionHumidities = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  let humidities = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.humidity.characteristicUUID });
  if (humidities) {
    ctx.body = humidities;
    ctx.status = 200;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the gas values corresponding to a given session.
 *     operationId: getSessionCO2
 *     responses:
 *       200:
 *         description: List of gas values.
 */
const getSessionCO2 = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  let gas = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.gaseco2.characteristicUUID });
  if (gas) {
    ctx.body = gas;
    ctx.status = 200;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the gps values corresponding to a given session.
 *     operationId: getSessionGPS
 *     responses:
 *       200:
 *         description: List of latitude/longitude.
 */
const getSessionGPS = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  let gps = await Thingy.find({ session_id: sessionID, message_type: 'gps' });
  if (gps) {
    ctx.body = gps;
    ctx.status = 200;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the average values corresponding to a given session.
 *     operationId: getUserAveragesValues
 *     responses:
 *       200:
 *         description: Speed, Temperature, Humidity, eCO2, TVOC.
 */
const getSessionAverageValues = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  let res = await Session.findOne({ id: sessionID });
  if (res) {
    ctx.body = {
      averageSpeed: res.averageSpeed,
      averageTemperature: res.averageTemperature,
      averageHumidity: res.averageHumidity,
      averageECO2: res.averageECO2,
      averageTVOC: res.averageTVOC
    };
    ctx.status = 200;
  }
};

export default{
  getSessions,
  getSessionByID,
  getSessionTemperatures,
  getSessionHumidities,
  getSessionCO2,
  getSessionGPS,
  getSessionAverageValues
};
