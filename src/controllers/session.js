'use strict';
import Session from '../models/session';
import Thingy from '../models/thingy';
import configThingy from '../config/thingy';
import User from '../models/user';

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get all the user's sessions or public sessions from the database.
 *     operationId: getSessions
 *     responses:
 *       200:
 *         description: List of sessions.
 */
const getSessions = async (ctx) => {
  let userSessions = await User.findOne({ _id: ctx.req.user.id }, 'session');
  let sessions = await Session.find({ $or: [{ _id: { $in: userSessions.session } }, { share: true }] });
  if(sessions) {
    ctx.body = sessions;
    ctx.status = 200;
  } else {
    ctx.body = { status: 'error' };
    ctx.status = 404;
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the session corresponding to the given ID. Has to be a public session or one of the user's sessions.
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
  let userSessions = await User.findOne({ _id: ctx.req.user.id }, 'session');
  if(userSessions.session.includes(sessionID)) {
    // user accesses one of his sessions
    let sessions = await Session.findOne({ _id: sessionID });
    if(sessions) {
      ctx.body = sessions;
      ctx.status = 200;
    } else {
      ctx.body = { status: 'error' };
      ctx.status = 404;
    }
  } else {
    // user accesses a public session: id = sessionID, share has to be true
    let sessions = await Session.findOne({ _id: sessionID, share: true });
    if(sessions) {
      ctx.body = sessions;
      ctx.status = 200;
    } else {
      ctx.body = { status: 'error' };
      ctx.status = 404;
    }
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the temperatures corresponding to a given session. Has to be a public session or one of the user's sessions.
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
  let userSessions = await User.findOne({ _id: ctx.req.user.id }, 'session');
  if(userSessions.session.includes(sessionID)) {
    // user getting temperatures for one of his sessions
    let temperatures = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.temperature.characteristicUUID });
    if (temperatures) {
      ctx.body = temperatures;
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  } else {
    // user getting temperatures for a public session
    let sessions = await Session.findOne({ _id: sessionID, share: true });
    if(sessions) {
      // session is public
      let temperatures = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.temperature.characteristicUUID });
      if (temperatures) {
        ctx.body = temperatures;
        ctx.status = 200;
      } else {
        ctx.status = 404;
        ctx.body = { status: 'error' };
      }
    } else {
      // session is private
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the humidities corresponding to a given session. Has to be a public session or one of the user's sessions.
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
  let userSessions = await User.findOne({ _id: ctx.req.user.id }, 'session');
  if(userSessions.session.includes(sessionID)) {
    // user getting humidities for one of his sessions
    let humidities = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.humidity.characteristicUUID });
    if (humidities) {
      ctx.body = humidities;
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  } else {
    // user getting humidities for a public session
    let sessions = await Session.findOne({ _id: sessionID, share: true });
    if(sessions) {
      // session is public
      let humidities = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.humidity.characteristicUUID });
      if (humidities) {
        ctx.body = humidities;
        ctx.status = 200;
      } else {
        ctx.status = 404;
        ctx.body = { status: 'error' };
      }
    } else {
      // session is private
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the gas values corresponding to a given session. Has to be a public session or one of the user's sessions.
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
  let userSessions = await User.findOne({ _id: ctx.req.user.id }, 'session');
  if(userSessions.session.includes(sessionID)) {
    // user getting gas for one of his sessions
    let gas = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.gaseco2.characteristicUUID });
    if (gas) {
      ctx.body = gas;
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  } else {
    // user getting gas for a public session
    let sessions = await Session.findOne({ _id: sessionID, share: true });
    if(sessions) {
      // session is public
      let gas = await Thingy.find({ session_id: sessionID, message_type: configThingy.characteristics.gaseco2.characteristicUUID });
      if (gas) {
        ctx.body = gas;
        ctx.status = 200;
      } else {
        ctx.status = 404;
        ctx.body = { status: 'error' };
      }
    } else {
      // session is private
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the gps values corresponding to a given session. Has to be a public session or one of the user's sessions.
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
  let userSessions = await User.findOne({ _id: ctx.req.user.id }, 'session');
  if(userSessions.session.includes(sessionID)) {
    // user getting gps for one of his sessions
    let gps = await Thingy.find({ session_id: sessionID, message_type: 'gps' });
    if (gps) {
      ctx.body = gps;
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  } else {
    // user getting gps for a public session
    let sessions = await Session.findOne({ _id: sessionID, share: true });
    if(sessions) {
      // session is public
      let gps = await Thingy.find({ session_id: sessionID, message_type: 'gps' });
      if (gps) {
        ctx.body = gps;
        ctx.status = 200;
      } else {
        ctx.status = 404;
        ctx.body = { status: 'error' };
      }
    } else {
      // session is private
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  }
};

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Get the average values corresponding to a given session. Has to be a public session or one of the user's sessions.
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
  let userSessions = await User.findOne({ _id: ctx.req.user.id }, 'session');
  if(userSessions.session.includes(sessionID)) {
    // user getting temperatures for one of his sessions
    let res = await Session.findOne({ _id: sessionID });
    if (res) {
      ctx.body = {
        averageSpeed: res.averageSpeed,
        averageTemperature: res.averageTemperature,
        averageHumidity: res.averageHumidity,
        averageECO2: res.averageECO2,
        averageTVOC: res.averageTVOC
      };
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = { status: 'error' };
    }
  } else {
    // user getting temperatures for a public session
    let sessions = await Session.findOne({ _id: sessionID, share: true });
    if(sessions) {
      // session is public
      let res = await Session.findOne({ _id: sessionID });
      if (res) {
        ctx.body = {
          averageSpeed: res.averageSpeed,
          averageTemperature: res.averageTemperature,
          averageHumidity: res.averageHumidity,
          averageECO2: res.averageECO2,
          averageTVOC: res.averageTVOC
        };
        ctx.status = 200;
      } else {
        ctx.status = 404;
        ctx.body = { status: 'error' };
      }
    }
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
