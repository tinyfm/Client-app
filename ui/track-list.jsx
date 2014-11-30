'use strict';

/** @jsx React.DOM */

var React = require('react');
var Track = require('./track.jsx');

module.exports = React.createClass({
  propTypes: {
    tracks: React.PropTypes.object.isRequired
  },

  render: function(){
    var tracks = this.props.tracks.map(function(data){
      return (<Track data={data} key={data.uri} />);
    });

    return (<ul id="tracks-list">{tracks}</ul>);
  }
});