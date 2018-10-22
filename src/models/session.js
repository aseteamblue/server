'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Session = new Schema({
  'title': { type: String },
  'type': { type: Boolean },
  'share': { type: Boolean },
  'totalDistance': { type: Number },
  'averageSpeed': { type: Number },
  'duration': { type: Number },
});

<<<<<<< HEAD
=======
global.sessionSchema = global.sessionSchema || mongoose.model('Session', Session);

>>>>>>> mongodb
export default Session;
