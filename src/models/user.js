'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  'thingyUri': { type: String },
  'lastName': { type: String },
  'firstName': { type: String },
  'address': { type: String },
  'username': { type: String },
  'totalDistanceJogging': { type: Number },
  'totalDistanceBicycle': { type: Number },
  'totalDistance': { type: Number },
  'totalTime': { type: Number },
  'session': [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  'trophies': [{ type: Schema.Types.ObjectId, ref: 'Trophy' }]

});

export default User;
