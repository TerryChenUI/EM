'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
};

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.validate = {
enable: true,
package: 'egg-validate'
}
