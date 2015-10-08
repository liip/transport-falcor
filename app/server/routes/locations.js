var api = require('../api');

module.exports = {
  route: 'locations[{keys:query}][{ranges}]["id","name"]',
  get: function(pathSets) {
      var query = pathSets.query[0];

      return api
        .getLocations(query)
        .then(function(locations) {

          var result = locations.reduce(function(acc, location, i) {
            pathSets[3].forEach(function(key) {
              acc.push({ path: ['locations', query, i, key], value: location[key] });
            });
            return acc;
          }, []);

          console.log(result);

          return result;
        })
        .catch(function(err) {
          console.error(err.stack);
        });
  }
};
