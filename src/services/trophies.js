'use strict';

import '../models/trophy';

const trophyCheck = async (user) => {
  let trophies = await global.TrophySchema.find({}).exec();
  let nb = trophies.length;

  for (let i = 0; i < nb; i++) {
    let id = String(trophies[i]._id);
    let key = trophies[i].key;
    let value = trophies[i].value;

    if(!(user.trophies.includes(id))) {
      if(key !== 'session' && user[key] >= value) {
        user.trophies.push(id);
      }
      if(key === 'session' && user.session.length >= value) {
        user.trophies.push(id);
      }
    }
  }

  user.save();
};

export default trophyCheck;
