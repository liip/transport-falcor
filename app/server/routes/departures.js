var api = require('../api');
var _ = require('lodash');

module.exports = {
  route: 'departures[{keys:ids}][{ranges:range}]["name","to","category"]',
  get: function(pathSets) {

    var ids = pathSets.ids,
      range = pathSets.range[0];


    return Promise.all(ids.map(function(id) {
      return api.getStationBoards(id.replace(':', '')).then(function(result) {
        return {id: id, result: result};
      })
      .catch(function(err) {
        return {id: id, error: err};
      });
    })).then(function(departureResults) {

      var result = departureResults.map(function(departureResult) {
        var departures = departureResult.result
          , error = departureResult.error
          , id = departureResult.id;

        if (error) {
          return { $type: 'error', value: error };
        } else {
          departures = departures.slice(range.from, range.to + 1);

          return departures.reduce(function(acc, departure, i) {

            pathSets[3].forEach(function(key) {
              acc.push({ path: ['departures', id, range.from + i, key], value: departure[key] });
            });

            return acc;
          }, []);
        }
      });

      result = _.flatten(result);
      return result;
    })
    .catch(function(err) {
      console.error(err.stack);
    });;
  }
};
