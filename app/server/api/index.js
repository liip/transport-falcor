var rp = require('request-promise');

var API_HOST = 'http://transport.opendata.ch/v1';

exports.getLocations = function(query) {
  console.log(API_HOST + '/locations');
  return rp({
    json: true,
    url: API_HOST + '/locations?query=' + query
  })
  .then(function(res) {
    return res.stations;
  });
};