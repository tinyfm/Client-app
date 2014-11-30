'use strict';

/** @jsx React.DOM */

var React = require('react');
var cx = require('react-classset');

module.exports = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
  },

  getInitialState: function(){
    return { expanded: false };
  },

  render: function(){
    var track = this.props.data;

    var rowClassName = cx(
      'track',
      this.state.expanded && 'track--expanded'
    );

    return (<li className={rowClassName}>
      <a href='{this.props.uri}' onClick={this.handleExpand}>
	<div className='track-title'>
	  <i className='fa fa-play-circle'></i>
	  {track.name}
	</div>

	<small className='track-author'>
	  {track.artists && track.artists[0]}
	  {track.genre && '- ' + track.length}
	  - {track.duration}
	</small>

	<div className='add-to-queue'>
	  <button onClick={this.handleClick}>Add to queue</button>
	</div>
      </a>
    </li>);
  },

  handleExpand: function(event){
    event.preventDefault();

    this.setState({ expanded: !this.state.expanded });
  },

  handleClick: function(event){
    event.preventDefault();

    this.props.onClick && this.props.onClick(this.props.data);
  }
});