import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/index';
import User from '../models/user';

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;

const options = {};

export const generatePassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const issue = (payload) => jwt.sign(payload, config.jwt_secret, { expiresIn: 60 * 60 * 4 });
export const verify = (token, cb) => jwt.verify(token, config.jwt_secret, {}, cb);

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  return User.findById({ id })
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if (!user) { return done(null, false); }
      if (!comparePass(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => { return done(err); });
}));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken({ failmessage: 'missing token' }),
    secretOrKey: config.jwt_secret,
  },
  ((jwtPayload, done) => {
    return User.findOne({ _id: jwtPayload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, { user });
      }
      return false;
    });
  }),
));
