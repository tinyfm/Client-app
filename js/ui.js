'use strict';

var Mopidy = require('mopidy');
var React = require('react');

var getTracks = require('./radio/list-tracks');
var queueTrack = require('./radio/queue-track');

var TrackList = require('../ui/track-list.jsx');
var NowPlaying = require('../ui/now-playing.jsx');

var client = new Mopidy({
  callingConvention: 'by-position-or-by-name',
  webSocketUrl: 'ws://' + location.hostname + ':6680/mopidy/ws/'
});

(function(){
  var currentTrack;

  client.on('state:online', function(){
    getTracks(client).then(updateList);
    client.playback.getCurrentTrack()
      .then(function(track){
        updateNowPlaying(track);

        setInterval(function(){
          client.playback.getTimePosition().then(function(time){
            updateNowPlaying(track, time);
          });
        }, 2500);
      });
  });

  client.on('event:trackPlaybackStarted', function(event){
    currentTrack = event.tl_track.track;

    updateNowPlaying(currentTrack);
  });
})();


function updateNowPlaying(track, currentTime){
  React.render(
    React.createElement(NowPlaying, { track: track, currentTime: currentTime }),
    document.querySelector('#now-playing__container')
  );
}

function updateList(tracks){
  React.render(
    React.createElement(TrackList, { tracks: tracks, onTrackQueued: queueTrack.bind(null, client) }),
    document.querySelector('.tracks-list__container')
  );
}