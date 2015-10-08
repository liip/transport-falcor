var api = require('../api');

module.exports = {
  route: 'locations[{keys:query}][{ranges:range}]["id","name"]',
  get: function(pathSets) {
      var query = pathSets.query[0]
        , range = pathSets.range[0];

      return api
        .getLocations(query)
        .then(function(locations) {
          locations = locations.slice(range.from, range.to + 1);

          var result = locations.reduce(function(acc, location, i) {
            pathSets[3].forEach(function(key) {
              acc.push({ path: ['locations', query, range.from + i, key], value: location[key] });
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
