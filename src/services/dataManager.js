import mongoose from 'mongoose';
import haversine from 'haversine';

import '../models/session';
import '../models/thingy';
import '../models/user';

import logger from '../logger';
import configThingy from '../config/thingy';

class dataManager {
  static addRaw(thingyId, sessionID, characteristic, value) {
    try {
      let msg = new global.ThingySchema({ device_id: thingyId, session_id: sessionID, message_type: characteristic, data: value });
      msg.save();
    } catch(UnhandledPromiseRejectionWarning) { return 1; }
    return 0;
  }

  static async startSession(sessionList, thingyId) {
    let user = await global.UserSchema.findOne({ thingyUri: thingyId }).exec();
    if(user) {
      let session = await global.SessionSchema.find({ _id: { $in: user.session }, active: true }).exec();
      if(session) {
        if(session.length !== 1) {
          logger.info({ event: 'datamanager' }, 'Thingy ' + thingyId + ' -> create a new session');
          let id = await this.createSession();
          user.session.push(id);
          sessionList.set(thingyId, id);
          user.save();
        }else {
          logger.info({ event: 'datamanager' }, 'Thingy ' + thingyId + ' -> already have an active session');
          sessionList.set(thingyId, session[0].id);
        }
      }else {
        logger.info({ event: 'datamanager' }, 'Thingy ' + thingyId + ' -> create the first session');
        let id = await this.createSession();
        user.session.push(id);
        sessionList.set(thingyId, id);
        user.save();
      }
    }
  }

  static async createSession() {
    let newSession = new global.SessionSchema({ _id: mongoose.Types.ObjectId(), active: true, dateStart: new Date() });
    newSession.save();
    return newSession._id;
  }

  static async createStaticSession(params, userID) {
    let duration = new Date(params.endDate).getTime() - new Date(params.startDate).getTime();
    let hours = duration / (1000 * 60 * 60);

    let newSession = new global.SessionSchema({
      _id: mongoose.Types.ObjectId(),
      type: true,
      active: false,
      title: params.title,
      dateStart: params.startDate,
      dateEnd: params.endDate,
      share: params.share,
      totalDistance: (params.totalDistance) ? params.totalDistance : 0,
      averageSpeed: (params.totalDistance) ? params.totalDistance / hours : 0,
      duration: duration
    });
    let user = await global.UserSchema.findOne({ _id: userID }).exec();
    newSession.save();
    user.session.push(newSession._id);
    user.save();
    return newSession;
  }

  static async stopSession(sessionId) {
    logger.info({ event: 'datamanager' }, 'Session ' + sessionId + ' finished');

    let session = await global.SessionSchema.findOne({ _id: sessionId }).exec();

    let gps = await global.ThingySchema.find({ session_id: sessionId, message_type: 'gps' }).sort({ date: 1 }).exec();
    let humidity = await global.ThingySchema.find({ session_id: sessionId, message_type: configThingy.characteristics.humidity.characteristicUUID }).exec();
    let temperature = await global.ThingySchema.find({ session_id: sessionId, message_type: configThingy.characteristics.temperature.characteristicUUID }).exec();

    let km = 0;
    let temp = 0;
    let hum = 0;

    for(let i = 0; i < (gps.length - 1); i++) {
      const start = {
        latitude: gps[i].data.lat,
        longitude: gps[i].data.lng
      };

      const stop = {
        latitude: gps[i + 1].data.lat,
        longitude: gps[i + 1].data.lng
      };
      km += parseFloat(haversine(start, stop));
    }
    logger.info({ event: 'datamanager' }, 'Session ' + sessionId + ' -> total distance: ' + km + 'km');

    if(humidity.length !== 0) {
      for(let i = 0; i < (humidity.length); i++) {
        hum += parseFloat(humidity[i].data);
      }
      hum /= humidity.length;
    }
    logger.info({ event: 'datamanager' }, 'Session ' + sessionId + ' -> avg humidity: ' + hum + '%');

    if(temperature.length !== 0) {
      for(let i = 0; i < (temperature.length); i++) {
        temp += parseFloat(temperature[i].data);
      }
      temp /= temperature.length;
    }
    logger.info({ event: 'datamanager' }, 'Session ' + sessionId + ' -> avg temperature: ' + temp + '°C');

    if(session) {
      session.averageTemperature = temp;
      session.averageHumidity = hum;
      session.totalDistance = km;
      session.active = false;
      session.dateEnd = Date.now();
      session.duration = session.dateEnd.getTime() - session.dateStart.getTime();

      let hours = session.duration / (1000 * 60 * 60);
      session.averageSpeed = km / hours;

      session.save();
    }
  }
}

export default dataManager;
