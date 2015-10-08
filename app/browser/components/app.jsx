var React = require('react')
  , Search = require('./search.jsx')
  , Departures = require('./departures.jsx')
  , model = require('../model');

module.exports = React.createClass({
  getInitialState: function() {
    return { locations: [] };
  },

  render: function() {
    var locations = this.state.locations;

    return (
      <div>
          <Search onSubmit={this.handleSubmitSearch} />
          <Departures locations={locations} />
      </div>
    );
  },

  handleSubmitSearch: function(value) {
    this.setState({ locations: [] });

    model.get('locations["' + value + '"][0..5].departures[0..5].to')
      .then((res) => {
        this.setState({ locations: res.json.locations });
      })
      .catch(function(err) {
        console.error(err);
      });

  }
});

//locations["Bern"][0..5].departures[0..5]["name","to"]