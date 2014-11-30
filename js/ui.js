'use strict';

var Mopidy = require('mopidy');
var React = require('react');
var getTracks = require('./radio/list-tracks');
var TrackList = require('../ui/track-list.jsx');

var client = new Mopidy({
  callingConvention: 'by-position-or-by-name',
  webSocketUrl: 'ws://' + location.hostname + ':6680/mopidy/ws/'
});

client.on('state:online', function(){
  getTracks(client).then(updateList);
});

function updateList(tracks){
  React.render(
    React.createElement(TrackList, { tracks: tracks }),
    document.querySelector('.tracks-list__container')
  );
}