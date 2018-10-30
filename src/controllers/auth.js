import passport from 'koa-passport';
import { issue, generatePassword } from '../services/auth';
import User from '../models/user';
/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Login the user.
 *     operationId: login
 *     responses:
 *       200:
 *         description: The login was successful.
 *       400:
 *         description: The Login failed.
 */
const login = (ctx) => {
  return passport.authenticate('local', (err, user) => {
    if (err) { throw err; }
    if (user) {
      ctx.login(user, (err2) => {
        if (err2) {
          ctx.status = 400;
          ctx.body = { status: 'error' };
        } else {
          const token = issue({ id: user.id });
          ctx.body = { user, token };
          ctx.status = 200;
        }
      });
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
};
// JUST TO ADD USER BUT NOT USE AFTER
const register = async (ctx) => {
  const params = ctx.request.query;
  if (params.username == null) {
    ctx.body = {
      msg: 'No field username'
    };
    ctx.status = 400;
  }
  return User.findOne({ username: params.username })
    .then(user => {
      if (user) {
        ctx.body = {
          msg: 'Already a user with this username!'
        };
        ctx.status = 400;
        return;
      }
      const pass = generatePassword('emf123');
      const newUser = new User();
      newUser.username = params.username;
      newUser.password = pass;
      if(params.thingy != null) {
        newUser.thingyUri = params.thingy;
      }
      return newUser.save()
        .then((user) => {
          const token = issue({ id: newUser.id });
          ctx.body = { user, token };
          ctx.status = 200;
        })
        .catch((err2) => {
          if (err2) {
            ctx.body = {
              error: err2
            };
            ctx.status = 400;
          }
        });
    });
};

export default {
  login,
  register
};
