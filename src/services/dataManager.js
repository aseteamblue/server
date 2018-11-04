import mongoose from 'mongoose';

import '../models/session';
import '../models/thingy';
import '../models/user';

import logger from '../logger';

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
      let session = await global.SessionSchema.find({ id: { $in: user.session }, active: true }).exec();
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
    let newSession = new global.SessionSchema({ id: mongoose.Types.ObjectId().toHexString(), active: true, dateStart: new Date() });
    newSession.save();
    return newSession.id;
  }

  static async stopSession(sessionId) {
    logger.info({ event: 'datamanager' }, 'Session ' + sessionId + ' finished');
    let session = await global.SessionSchema.findOne({ id: sessionId }).exec();
    if(session) {
      session.active = false;
      session.dateEnd = Date.now();
      session.save();
    }
  }
}

export default dataManager;
