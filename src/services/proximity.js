'use strict';

import logger from '../logger';
import haversine from 'haversine';
import thingy from '../config/thingy.js';

// max distance for detection in km
const maxDist = 0.1;

const proximity = async (gps, thingyURI, client) => {
  for (let entries of gps.entries()) {
    if(entries[1] !== null) {
      if(entries[0] !== thingyURI) {
        const start = {
          latitude: gps.get(thingyURI).lat,
          longitude: gps.get(thingyURI).lng
        };
        const stop = {
          latitude: entries[1].lat,
          longitude: entries[1].lng
        };

        if(haversine(start, stop) <= maxDist) {
          logger.info({ event: 'proximity' }, 'Thingies ' + thingyURI + ' and ' + entries[0] + ' are near !');
          // change color to green
          client.publish(
            thingyURI + '/' + thingy.characteristics.led.serviceUUID
            + '/' + thingy.characteristics.led.characteristicUUID
            + '/write',
            Buffer.from('0100b903', 'hex')
          );
          client.publish(
            thingyURI + '/' + thingy.characteristics.speakerconfig.serviceUUID
            + '/' + thingy.characteristics.speakerconfig.characteristicUUID
            + '/write',
            Buffer.from('0301', 'hex')
          );
          client.publish(
            thingyURI + '/' + thingy.characteristics.speakerdata.serviceUUID
            + '/' + thingy.characteristics.speakerdata.characteristicUUID
            + '/write',
            Buffer.from('01', 'hex')
          );
          await sleep(1000);
          // change color to blue
          client.publish(
            thingyURI + '/' + thingy.characteristics.led.serviceUUID
            + '/' + thingy.characteristics.led.characteristicUUID
            + '/write',
            Buffer.from('010000FF', 'hex')
          );
        }
      }
    }
  }
};

function sleep(ms) {
  return new Promise(resolve=>{
    setTimeout(resolve, ms);
  });
}

export default proximity;
