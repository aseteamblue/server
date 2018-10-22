import passport from 'koa-passport';
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
      ctx.login(user);
      ctx.body = { status: 'success' };
      ctx.status = 200;
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
};

export default {
  login
};
