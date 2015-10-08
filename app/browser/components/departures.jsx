var React = require('react')
  , _ = require('lodash');

module.exports = React.createClass({
  
  render: function() {
    var locations = this.props.locations.map(function(location) {
      var departures = _.values(location.departures).map(function (departure) {
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