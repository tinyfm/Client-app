'use strict';

var when = require('when');

/**
 * Computes a flat structure of tracks hosted on the radiopi
 *
 * @param {Modipy} modipy configured modipy instance
 * @returns {Promise}
 * @example
 *
 * var listTracks = require('./src/radio/list-tracks');
 *
 * ...on('state:online', function(){
 *   listTracks(modipy).then(function(tracks){
 *     // ...
 *   });
 * })
 */
module.exports = function (mopidy) {
  function accumulateTracksInDirs (allTracks, dirs) {
    return when.all(dirs.map(function (dir) {
      return mopidy.library.browse({uri: dir})
    }))
      .spread(function (results) {
        if (!results) {
          return allTracks;
        }

        var tracks = allTracks.concat(getTracksFromRefs(results));
        var dirs = getDirsFromRefs(results);

        return accumulateTracksInDirs(tracks, dirs);
      })
  }

  return accumulateTracksInDirs([], [null])
    .then(function (trackUris) {
      return mopidy.library.search({uris: trackUris}).then(function (results) {
        return results[0].tracks.map(function(d){
            if (!d.name){
              console.log(d.uri);
              d.name = /track:(.+)$/.exec(d.uri)[1].split('/').pop();
            }
            return d;
          }).sort(function (a, b) {
            var aName = String(a.name || '');
            var bName = String(b.name || '');

            return aName > bName ? 1 : (aName < bName ? -1 : 0);
          });
      })
    });
};

var getTracksFromRefs = getTypeFromRefs.bind(null, 'track');
var getDirsFromRefs = getTypeFromRefs.bind(null, 'directory');

function getTypeFromRefs (type, refs) {
  return refs.filter(function (ref) {
    return ref.type === type;
  })
    .map(function (ref) {
      return ref.uri;
    });
}