var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { value: '' };
  },

  render: function() {
    var value = this.state.value;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={value} onChange={this.handleChange} placeholder="Enter station name" />
      </form>
    );
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var value = this.state.value.trim();
    this.props.onSubmit(value);
  }
});