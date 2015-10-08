var api = require('../api');

module.exports = {
  route: 'connections[{keys:query}][{ranges:range}][{keys:fields}]',
  get: function(pathSets) {
    var fromLocation = pathSets.query[0],
      toLocation = pathSets.query[1],
      range = pathSets.range[0],
      fields = pathSets.fields;

    console.log(fromLocation, toLocation, range, fields);

    return api
      .getConnections(fromLocation, toLocation)
      .then(function(connections) {
        console.log(connections);

        connections = connections.slice(range.from, range.to + 1);

        return connections.reduce(function(acc, location, i) {
          pathSets[3].forEach(function(key) {
            if (location[key]) {
              acc.push({ path: ['locations', query, range.from + i, key], value: location[key] });
            }
          });

          // Location ref
          acc.push({
            path: ['locations', query, i, 'departures'],
            value: { $type: 'ref', $expires: -30 * 1000, value: ['departures', '"' + location.id + '"'] }
          });

          return acc;
        }, []);
      })
      .catch(function(err) {
        console.error(err.stack);
      });
  }
};
