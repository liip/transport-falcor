var api = require('../api');

module.exports = {
  route: 'locations[{keys:query}][{ranges:range}]["id","name","score","coordinate","departures"]',
  get: function(pathSets) {
      var query = pathSets.query[0]
        , range = pathSets.range[0]
        , fields = pathSets[3]

      return api
        .getLocations(query)
        .then(function(locations) {
          locations = locations.slice(range.from, range.to + 1);

          return locations.reduce(function(acc, location, i) {

            fields.forEach(function(key) {
              if (location[key]) {
                var falcorValue = { path: ['locations', query, range.from + i, key], value: location[key] };

                if (key === 'coordinate') {
                  falcorValue.value = { $type: 'atom', value: falcorValue.value };
                }

                acc.push(falcorValue);
              }
            });

            // Location ref
            acc.push({
              path: ['locations', query, i, 'departures'],
              value: {
                $type: 'ref',
                // $expires: -30 * 1000,
                value: ['departures',  ':' + location.id]
              }
            });

            return acc;
          }, []);
        })
        .catch(function(err) {
          console.error(err.stack);
        });
  }
};