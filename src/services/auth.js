import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import { findById, findOne } from '../models/user';

const options = {};

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
  return findById({ id })
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
});

passport.use(new LocalStrategy(options, (username, password, done) => {
  findOne({ username })
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
