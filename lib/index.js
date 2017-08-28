'use strict';

const Bcrypt = require('bcrypt');

module.exports.compare = function (event, context, callback) {
  if (typeof event.value !== 'string') {
    return callback(new TypeError('value must be a string'), null);
  }

  if (typeof event.hash !== 'string') {
    return callback(new TypeError('hash must be a string'), null);
  }

  Bcrypt.compare(event.value, event.hash, callback);
};
