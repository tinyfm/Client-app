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
      'episode',
      this.state.expanded && 'episode-expanded'
    );

    return (<li className="track">
      <a href={this.props.uri} className={rowClassName} onClick={this.handleExpand}>
        <div className='track-title'>
          <i className='fa fa-play-circle'></i>
	        {this.formatTrackName()}
        </div>

        <small className='track-author'>
          {track.artists && track.artists[0]}
          {track.genre && '- ' + track.genre}
        </small>

        <button className='add-to-queue' onClick={this.handleClick}>
          Add to queue
        </button>

        <p className="additional-info">
          <span className="label">{track.date}</span>
          <span className="label">{this.formatDuration()}</span>
        </p>
      </a>
    </li>);
  },

  handleExpand: function(event){
    event.preventDefault();

    this.setState({ expanded: !this.state.expanded });
  },

  handleClick: function(event){
    event.preventDefault();
    event.stopPropagation();

    this.props.onClick && this.props.onClick(this.props.data);
  },

  formatTrackName: function(){
    if (String(this.props.data.name).length < 60){
      return this.props.data.name;
    }

    return this.props.data.name.slice(0, 60) + '…';
  },

  formatDuration: function(){
    return Math.ceil(this.props.data.length / (1000 * 60 * 60)) + 'h.';
  }
});