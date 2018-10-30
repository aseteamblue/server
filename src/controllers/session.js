'use strict';
import Session from '../models/session';

const getSessions = async (ctx) => {
  await Session.find({}, (err, res) => {
    if (err) { throw err; }
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    }
  });
};

const getSessionByID = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  await Session.findOne({ _id: sessionID }, (err, res) => {
    if (err) { throw err; }
    if (res) {
      ctx.body = res;
      ctx.status = 200;
    }
  });
};

const getSessionTemperatures = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  // TODO
};

const getSessionHumidities = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  // TODO
};

const getSessionCO2 = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  // TODO
};

const getSessionGPS = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  // TODO
};

const getSessionAverageValues = async (ctx) => {
  const sessionID = ctx.params.sessionID;
  if (sessionID == null) {
    ctx.body = {
      msg: 'No field sessionID'
    };
    ctx.status = 400;
  }
  await Session.findOne({ _id: sessionID }, (err, res) => {
    if (err) { throw err; }
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
  });
};
