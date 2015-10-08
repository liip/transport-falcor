var api = require('../api');

module.exports = {
  route: 'locations[{keys:query}][{ranges:range}]["id","name"]',
  get: function(pathSet) {
      var query = pathSet.query[0]
        , range = pathSet.range[0]
        , keys = pathSet[3];

      return api
        .getLocations(query)
        .then(function(locations) {
          locations = locations.slice(range.from, range.to + 1);

          var result = locations.reduce(function(acc, location, i) {
            keys.forEach(function(key) {
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
