'use strict';

/** @jsx React.DOM */

var React = require('react');
var Track = require('./track.jsx');

module.exports = React.createClass({
  propTypes: {
    tracks: React.PropTypes.array.isRequired,
    onTrackQueued: React.PropTypes.func
  },

  render: function(){
    var tracks = this.props.tracks.map(function(data){
      return (<Track data={data} key={data.uri} onClick={this.props.onTrackQueued} />);
    }, this);

    return (<ul id="tracks-list">{tracks}</ul>);
  }
});