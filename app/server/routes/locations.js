var api = require('../api');

module.exports = {
  route: 'locations[{keys:query}][{ranges}]["id","name","departures"]',
  get: function(pathSets) {
      var query = pathSets.query[0];

      return api
        .getLocations(query)
        .then(function(locations) {
          return locations.reduce(function(acc, location, i) {
            pathSets[3].forEach(function(key) {
              acc.push({ path: ['locations', query, i, key], value: location[key] });
            });

            // Location ref
            acc.push({
              path: ['locations', query, i, 'departures'],
              value: { $type: 'ref', value: ['departures', '"' + location.id + '"'] }
            });

            return acc;
          }, []);
        })
        .catch(function(err) {
          console.error(err.stack);
        });
  }
};
