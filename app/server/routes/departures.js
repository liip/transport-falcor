var api = require('../api');

module.exports = {
  route: 'departures[{keys:ids}][{ranges:range}]["name","to","category"]',
  get: function(pathSets) {
    var id = pathSets.ids[0],
      range = pathSets.range[0];

    return api
      .getStationBoards(id)
      .then(function(departures) {
        departures = departures.slice(range.from, range.to + 1);

        return departures.reduce(function(acc, departure, i) {
          pathSets[3].forEach(function(key) {
            acc.push({ path: ['departures', id, range.from + i, key], value: departure[key] });
          });

          return acc;
        }, []);
      })
      .catch(function(err) {
        console.error(err.stack);
      });
  }
};
