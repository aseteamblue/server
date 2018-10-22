'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

global.UserSchema = global.UserSchema || mongoose.model('User', UserSchema);

export default UserSchema;
