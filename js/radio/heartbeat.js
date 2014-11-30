'use strict';

module.exports = function(client, time, callback){
  setInterval(function(){
    client.playback.getCurrentTrack().then(function(track){
      if (track){
        client.playback.getTimePosition().then(function(time){
          callback(track, time);
        });
      }
    })
  }, time);
};