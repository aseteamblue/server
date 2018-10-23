import mongoose from 'mongoose';

import '../models/session';
import '../models/thingy';

class dataManager {
  static addRaw(thingyId, sessionID, characteristic, value) {
    try {
      let msg = new global.ThingySchema({ device_id: thingyId, session_id: sessionID, message_type: characteristic, data: value });
      msg.save();
    } catch(UnhandledPromiseRejectionWarning) { return 1; }
    return 0;
  }

  static newSession() {
    let session = new global.SessionSchema({ id: mongoose.Types.ObjectId().toHexString(), active: true, dateStart: new Date() });
    session.save();
    return session.id;
  }
}

export default dataManager;
