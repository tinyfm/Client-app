'use strict';

module.exports = function queueTrack(client, track){
  client.tracklist
    .filter({ uri: [track.uri] })
    .then(function(result){
      // we do not want to queue a file which is already in the queue
      if (result.length === 0) {
        client.tracklist
          .add({ uri: track.uri })
          .then(function(){
            return client.playback.getState();
          })
          .then(function(state){
            // auto play if the queue was stopped
            if (state !== 'playing'){
              client.playback.play();
            }
          });
      }
    });
};