'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  'title': { type: String },
  'type': { type: Boolean },
  'share': { type: Boolean },
  'totalDistance': { type: Number },
  'averageSpeed': { type: Number },
  'duration': { type: Number },
});

global.SessionSchema = global.SessionSchema || mongoose.model('Session', SessionSchema);

export default SessionSchema;
