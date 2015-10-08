var api = require('../api');

module.exports = {
  route: 'locations[{keys:query}]["id","name"]',
  get: function(pathSets) {
      var query = pathSets.query[0];

      return api
        .getLocations(query)
        .then(function(locations) {
          var result = locations.reduce(function(acc, location) {
            pathSets[2].forEach(function(key) {
              acc.push({ path: ['locations', location.id, key], value: location[key] });
            });
            return acc;
          }, []);

          return result;
        })
        .catch(function(err) {
          console.error(err.stack);
        });
  }
};
