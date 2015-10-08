var React = require('react');

module.exports = React.createClass({
  render: function() {
    console.log(this.props.locations);

    var locations = this.props.locations.map(function(location) {
      var result = [];
      location.departures.forEach(function (departure) {
        result.push(
          <li>
            {departure.to}
          </li>
        )
      });
      return result;
    });

    return (
      <ul>
        {locations}
      </ul>
    );
  }
});