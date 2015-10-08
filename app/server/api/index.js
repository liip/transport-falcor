var rp = require('request-promise')
  , config = require('../../config');

function get(path, qs) {
  return rp({
    url: config.API_HOST + path,
    qs: qs,
    json: true,
    useQuerystring: true
  });
}


exports.getLocations = function(query) {
  return get('/locations', { query: query })
    .then(function(res) {
      return res.stations;
    });
};