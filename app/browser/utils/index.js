var _ = require('lodash');

var regex = new RegExp('^\\x1E');

exports.getValues = function(values) {
  return Object.keys(values || {})
    .filter(function(key) {
      return !regex.test(key);
    })
    .map(function(key) {
      return values[key];
    });
};