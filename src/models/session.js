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


const model = mongoose.model('Session', Session);
export default model;
