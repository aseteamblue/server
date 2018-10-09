'use strict';

import { join } from 'path';
import { default as config2 }  from './';

const directory = process.env.LOG_DIRECTORY || join(__dirname, '../../');
const filename = process.env.LOG_FILENAME || `${config2.name}.${config2.env}.json.log`;

const config = {
  name: config2.name,
  streams: []
};

// Add streams as depending on the environment
if (config2.env === 'production') {
  config.streams.push({
    type: 'rotating-file',
    path: join(directory, filename),
    period: '1d',
    count: 7,
    level: process.env.LOG_LEVEL || 'info'
  });
  config.streams.push({
    type: 'stream',
    stream: process.stderr,
    level: 'warn'
  });
} else if (config2.env === 'development') {
  config.streams.push({
    type: 'stream',
    stream: process.stdout,
    level: 'debug'
  });
}

export default config;
