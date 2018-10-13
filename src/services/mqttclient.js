'use strict';

import mqtt from 'mqtt';
import config from '../config/mqtt.js';
import logger from '../logger';
import thingy from '../config/thingy.js';

const mqttclient = () =>{
  // Connect to the MQTT broker
  const client = mqtt.connect(config.wsshost, { username: config.mqttuser, password: config.mqttpassword });

  // Subscribe to everything
  // Will change once we store the UUIDs of the Thingys
  // -> subscribe to UUID/# or specific services/characteristics
  // -> subscribe only when the user presses the button
  client.subscribe('#');

  // Only here to test
  // We'll need to store that. If (receive){user is running -> get data from broker} else {user is not running -> do nothing}
  let receive = new Map();

  client.on('message', (topic, message) => {
    let thingyURI = topic.substr(0, topic.indexOf('/'));
    if(!receive.has(thingyURI)) {
      receive.set(thingyURI, false);
    }

    if(topic.toString().includes(thingy.characteristics.button.characteristicUUID)) {
      // button
      let value = (message[0] === 0x00) ? 'released' : 'pressed';
      logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Button ' + value);
      if (message[0] === 0x0) { receive.set(thingyURI, !receive.get(thingyURI)); }
    }

    if(receive.get(thingyURI)) {
      if(topic.toString().includes(thingy.characteristics.temperature.characteristicUUID)) {
        // temperature
        let value = message[0] + '.' + message[1];
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Temperature: ' + value + thingy.characteristics.temperature.unit);
      } else if(topic.toString().includes(thingy.characteristics.pressure.characteristicUUID)) {
        // pressure
        let intBinary = message[3].toString(2) + message[2].toString(2) + message[1].toString(2) + message[0].toString(2);
        let value = parseFloat(parseInt(intBinary, 2) + '.' + message[4]);
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Pressure: ' + value + thingy.characteristics.pressure.unit);
      } else if(topic.toString().includes(thingy.characteristics.humidity.characteristicUUID)) {
        // humidity
        let value = message[0];
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Humidity: ' + value + thingy.characteristics.humidity.unit);
      } else if(topic.toString().includes(thingy.characteristics.gaseco2.characteristicUUID)) {
        // gas
        let eco2 = parseInt(message[1].toString(2) + message[0].toString(2), 2);
        let tvoc = parseInt(message[3].toString(2) + message[2].toString(2), 2);
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Gas (eCO2): ' + eco2 + thingy.characteristics.gaseco2.unit + ', Gas (TVOC): ' + tvoc + thingy.characteristics.gastvoc.unit);
      } else if(topic.toString().includes('gps')) {
        // GPS
        let value = JSON.parse(message);
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> GPS: ' + value.latitude + ', ' + value.longitude);
      }
    }

    // GPS position
    else if(topic.toString().includes("gps")){
      logger.info({event:'mqtt'}, 'Position:'+ message);
    }
  });

  return async (ctx, next) => {
    await next();
  };
};

export default mqttclient;
