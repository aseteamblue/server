import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  'thingyUri': { type: String },
  'lastName': { type: String },
  'firstName': { type: String },
  'address': { type: String },
  'username': { type: String },
<<<<<<< HEAD
  'password': { type: String },
=======
  'password' : { type: String },
>>>>>>> 3d2b8e1ed8761fbd75867e19be4ca8df9a8621f8
  'totalDistanceJogging': { type: Number },
  'totalDistanceBicycle': { type: Number },
  'totalDistance': { type: Number },
  'totalTime': { type: Number },
  'session': [{ type: String }],
  'trophies': [{ type: String }]

});

global.UserSchema = global.UserSchema || mongoose.model('User', UserSchema);

export default global.UserSchema;
