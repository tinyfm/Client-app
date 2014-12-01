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
      <p>Now playing: <b>{this.formatTrackName()}</b></p>

      <progress id="progressbar" value={this.timeToPercentage()} max="100"></progress>
    </div>);
  },

  formatTrackName: function(){
    var name = '';

    if (this.props.track.name) {
      name = this.props.track.name;
    }
    else {
      name = /track:(.+)$/.exec(this.props.track.uri)[1]
        .split('/').pop()
        .split('.').slice(0, -1).join('.');
    }

    return name;
  },

  timeToPercentage: function(){
    return Math.ceil((this.props.currentTime / this.props.track.length) * 100);
  }
});