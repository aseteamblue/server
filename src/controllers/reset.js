import config from '../config';
import '../models/session';
import '../models/thingy';
import '../models/user';
import '../models/trophy';
import zenio from 'zenio';
import fs from 'fs';
import path from 'path';

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Public
 *     summary: Reset the database.
 *     operationId: reset
 *     responses:
 *       200:
 *         description: Database deleted.
 */
const reset = async (ctx) => {
  await global.UserSchema.deleteMany({});
  await global.ThingySchema.deleteMany({});
  await global.SessionSchema.deleteMany({});
  await global.TrophySchema.deleteMany({});

  await trophies();

  for(let i = 1; i <= 3; i++) {
    await zenio.get(`${config.host}:${config.port}/auth/register?username=test${i}&thingy=blue0${i}`);
  }

  ctx.status = 200;
};

const trophies = async () => {
  let json = JSON.parse(fs.readFileSync(path.join(__dirname, '../constants/trophies.json'), 'utf8'));
  let max = json.length;
  for (let i = 0; i < max; i++) {
    let newTrophy = new global.TrophySchema({
      type: json[i].type,
      description: json[i].description,
      key: json[i].key,
      value: json[i].value
    });

    newTrophy.save();
  }
};

export default {
  reset
};
