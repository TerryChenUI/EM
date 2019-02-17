'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531749775035_5435';

  // add your config here
  config.middleware = ['notFoundHandler', 'errorHandler'];

  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/EP',
      options: { useNewUrlParser: true }
    }
  };

  config.cors = {
    // {string|Function} origin: '*',
    // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    origin: '*',
    allowHeaders: '*',
    allowMethods: '*',
    credentials: true
  };

  config.security = {
    csrf: {
      enable: false
    }
  };

  config.jwt = {
    secret: '123456',
    expiresIn: '7d'
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    // support lazy load
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000
  };

  config.server = {
    apiPrefix: '/api/v1'
  };

  // config.onerror = {
  //   json(err, ctx) {
  //     ctx.body = { message: '服务器内部错误' };
  //     ctx.status = 500;
  //   }
  // }

  return config;
};
