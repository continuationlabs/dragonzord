'use strict';

const Bcrypt = require('bcrypt');

module.exports.compare = function (event, context, callback) {
  if (typeof event.value !== 'string') {
    return callback(new TypeError('you did not supply a value to compare'), null);
  }

  if (typeof event.hash !== 'string') {
    return callback(new TypeError('you did not supply a hashed value to compare against'), null);
  }

  Bcrypt.compare(event.value, event.hash, callback);
};
