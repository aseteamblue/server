'use strict';

import mqtt from 'mqtt';
import config from '../config/mqtt.js';
import logger from '../logger';
import thingy from '../config/thingy.js';

import data from './dataManager';

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

  // Do a link with thingy and session
  let sessions = new Map();

  client.on('message', (topic, message) => {
    let thingyURI = topic.substr(0, topic.indexOf('/'));
    if(!receive.has(thingyURI)) {
      receive.set(thingyURI, false);
    }

    if(topic.toString().includes(thingy.characteristics.button.characteristicUUID)) {
      // button
      let value = (message[0] === 0x00) ? 'released' : 'pressed';
      logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Button ' + value);

      // test if a session exist with the thingy
      if(!receive.get(thingyURI) && value === 'pressed') {
        data.startSession(sessions, thingyURI);
        // change LED color to blue
        client.publish(
          thingyURI + '/' + thingy.characteristics.led.serviceUUID
          + '/' + thingy.characteristics.led.characteristicUUID
          + '/write',
          Buffer.from('010000FF', 'hex')
        );
      }else if(receive.get(thingyURI) && value === 'pressed') {
        data.stopSession(sessions.get(thingyURI));
        sessions.set(thingyURI, null);
        // change LED color to red
        client.publish(
          thingyURI + '/' + thingy.characteristics.led.serviceUUID
          + '/' + thingy.characteristics.led.characteristicUUID
          + '/write',
          Buffer.from('01FF0000', 'hex')
        );
      }

      if (message[0] === 0x0) { receive.set(thingyURI, !receive.get(thingyURI)); }
    }

    if(receive.get(thingyURI) && sessions.get(thingyURI) !== null) {
      let sessionID = sessions.get(thingyURI);
      if(topic.toString().includes(thingy.characteristics.temperature.characteristicUUID)) {
        // temperature
        let value = message[0] + '.' + message[1];
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Temperature: ' + value + thingy.characteristics.temperature.unit);
        data.addRaw(thingyURI, sessionID, thingy.characteristics.temperature.characteristicUUID, value);
      } else if(topic.toString().includes(thingy.characteristics.pressure.characteristicUUID)) {
        // pressure
        let intBinary = message[3].toString(2) + message[2].toString(2) + message[1].toString(2) + message[0].toString(2);
        let value = parseFloat(parseInt(intBinary, 2) + '.' + message[4]);
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Pressure: ' + value + thingy.characteristics.pressure.unit);
        data.addRaw(thingyURI, sessionID, thingy.characteristics.pressure.characteristicUUID, value);
      } else if(topic.toString().includes(thingy.characteristics.humidity.characteristicUUID)) {
        // humidity
        let value = message[0];
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Humidity: ' + value + thingy.characteristics.humidity.unit);
        data.addRaw(thingyURI, sessionID, thingy.characteristics.humidity.characteristicUUID, value);
      } else if(topic.toString().includes(thingy.characteristics.gaseco2.characteristicUUID)) {
        // gas
        let eco2 = parseInt(message[1].toString(2) + message[0].toString(2), 2);
        let tvoc = parseInt(message[3].toString(2) + message[2].toString(2), 2);
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> Gas (eCO2): ' + eco2 + thingy.characteristics.gaseco2.unit + ', Gas (TVOC): ' + tvoc + thingy.characteristics.gastvoc.unit);
        data.addRaw(thingyURI, sessionID, thingy.characteristics.gaseco2.characteristicUUID, (eco2 + '/' + tvoc));
      } else if(topic.toString().includes('gps')) {
        // GPS
        let value = JSON.parse(message);
        logger.info({ event: 'mqtt' }, 'Thingy ' + thingyURI + ' -> GPS: ' + value.latitude + ', ' + value.longitude);
        data.addRaw(thingyURI, sessionID, 'gps', { 'latitude': value.latitude, 'longitute': value.longitude });
      }
    }
  });

  return async (ctx, next) => {
    await next();
  };
};

export default mqttclient;
