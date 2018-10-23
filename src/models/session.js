'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  'id': { type: String },
  'title': { type: String, default: '' },
  'type': { type: Boolean, default: true },
  'share': { type: Boolean, default: false },
  'totalDistance': { type: Number, default: 0 },
  'averageSpeed': { type: Number, default: 0 },
  'averageTemperature': { type: Number, default: 0 },
  'averageHumidity': { type: Number, default: 0 },
  'averageECO2': { type: Number, default: 0 },
  'averageTVOC': { type: Number, default: 0 },
  'duration': { type: Number, default: 0 },
  'dateStart': { type: Date, default: Date.now },
  'dateEnd': { type: Date, default: Date.now },
  'active': { type: Boolean, default: true }
});

global.SessionSchema = global.SessionSchema || mongoose.model('Session', SessionSchema);

export default SessionSchema;
