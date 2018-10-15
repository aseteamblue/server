'use strict';

import Mongoose from 'mongoose';

// Import the db models for interacting with the database
// let User = Mongoose.model('User');
let Thingy = Mongoose.model('Thingy');
// let Session = Mongoose.model('Session');

class dataManager {
  static async addRaw(thingyId, characteristic, value) {
    let msg = new Thingy({ device_id: thingyId, message_type: characteristic, data: value });
    await msg.save().exec();
    return 0;
  }
}

export default dataManager;
