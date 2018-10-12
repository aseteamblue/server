'use strict';

const config = {
  mqttuser: process.env.MQTT_USER || 'blue',
  mqttpassword: process.env.MQTT_PASSWORD || 'f58e6c045b',
  wsshost: process.env.MQTT_WSS_HOST || 'wss://mqtt.thing.zone:8094',
  mqtthost: process.env.MQTT_MQTT_HOST || 'mqtt://mqtt.thing.zone:1894'
};

export default config;
