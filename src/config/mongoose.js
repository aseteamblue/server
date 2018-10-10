'use strict';

const config = {
  dbuser: process.env.DB_USER || 'test',
  dbpassword: process.env.DB_PASSWORD || 'ask4test',
  dbhost: process.env.DB_HOST || 'ds257372.mlab.com',
  dbport: process.env.DB_PORT || 57372,
  db: process.env.DB || 'ase2018dev'
};

export default config;
