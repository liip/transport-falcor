var React = require('react')
  , Search = require('./search.jsx')
  , Departures = require('./departures.jsx')
  , model = require('../model')
  , _ = require('lodash');

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

    model.get('locations["' + value + '"][0..1].departures[0..5]["to","name"]',
              'locations["' + value + '"][0..1].name')
      .then((res) => {
        console.log(res);

        this.setState({ locations: _.values(res.json.locations[value]) });
      })
      .catch(function(err) {
        console.error(err);
      });

  }
});

//locations["Bern"][0..5].departures[0..5]["name","to"]