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

  client.on('message', (topic, message) => {
    let thingyURI = topic.substr(0, topic.indexOf('/'));

    // temperature
    if(topic.toString().includes(thingy.characteristics.temperature.characteristicUUID)) {
      let value = message[0] + '.' + message[1];
      logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Temperature: ' + value + thingy.characteristics.temperature.unit);
    }

    // pressure
    else if(topic.toString().includes(thingy.characteristics.pressure.characteristicUUID)) {
      // TODO
    }

    // humidity
    else if(topic.toString().includes(thingy.characteristics.humidity.characteristicUUID)) {
      let value = message[0];
      logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Humidity: ' + value + thingy.characteristics.humidity.unit);
    }

    // gas
    else if(topic.toString().includes(thingy.characteristics.gaseco2.characteristicUUID)) {
      // TODO
    }

    // light
    else if(topic.toString().includes(thingy.characteristics.light.characteristicUUID)) {
      // TODO
    }

    // button
    else if(topic.toString().includes(thingy.characteristics.button.characteristicUUID)) {
      let value = (message[0] === 0x00) ? 'released' : 'pressed';
      logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Button ' + value);
    }
  });

  return async (ctx, next) => {
    await next();
  };
};

export default mqttclient;
