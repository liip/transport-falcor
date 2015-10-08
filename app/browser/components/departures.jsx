var React = require('react')
  , _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    var locations = this.props.locations.map(function(location) {
      return _.values(location.departures).map(function (departure) {
        return (
          <li>
            {departure.to}
          </li>
        )
      });
    });

    return (
      <ul>
        {locations}
      </ul>
    );
  }
});