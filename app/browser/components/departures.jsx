var React = require('react')
  , utils = require('../utils');

module.exports = React.createClass({

  render: function() {
    var locations = utils.getValues(this.props.locations).map(function(location) {
      var departures = utils.getValues(location.departures).map(function (departure) {
        return (
          <li>
            {departure.to}
          </li>
        );
      });

      return(
        <div>
          <h1>{location.name}</h1>
          <ul>
            {departures}
          </ul>
        </div>
      );
    });

    return (
      <div>
        {locations}
      </div>
    );
  }

});