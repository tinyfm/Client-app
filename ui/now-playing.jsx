'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function(){
    return { currentTime: 0 };
  },

  render: function(){
    if (!this.props.track){
      return null;
    }

    return (<div id="now-playing">
      <p>Now playing: <b>{this.props.track.name}</b></p>

      <progress id="progressbar" value={this.timeToPercentage()} max="100"></progress>
    </div>);
  },

  timeToPercentage: function(){
    return Math.ceil(((this.props.track.length - this.props.currentTime) / this.props.track.length) * 100);
  }
});