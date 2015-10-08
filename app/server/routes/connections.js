var api = require('../api');

module.exports = {
  route: 'connections[{keys:query}][{ranges:range}][{keys:fields}]',
  get: function(pathSets) {
    var fromLocation = pathSets.query[0],
      toLocation = pathSets.query[1],
      range = pathSets.range[0],
      fields = pathSets.fields;

    return api
      .getConnections(fromLocation, toLocation)
      .then(function(connections) {
        connections = connections.slice(range.from, range.to + 1);

        return connections.reduce(function(acc, connection, i) {
          fields.forEach(function(key) {
            if (connection.from[key]) {
              acc.push({ path: ['connections', fromLocation, range.from + i, key], value: connection.from[key] });
            }

            if (connection.to[key]) {
              acc.push({ path: ['connections', toLocation, range.from + i, key], value: connection.to[key] });
            }
          });

          // Location ref
          acc.push({
            path: ['connections', fromLocation, range.from + i, 'location'],
            value: { $type: 'ref', $expires: -30 * 1000, value: ['locations', '"' + connection.from.station.name + '"'] }
          });

          acc.push({
            path: ['connections', toLocation, range.from + i, 'location'],
            value: { $type: 'ref', $expires: -30 * 1000, value: ['locations', '"' + connection.to.station.name + '"'] }
          });

          return acc;
        }, []);
      })
      .catch(function(err) {
        console.error(err.stack);
      });
  }
};
