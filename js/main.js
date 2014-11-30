function buildPlaylist(json) {
  $.getJSON(json, function(data) {
    for (var i=0; i<data.tracks.length; i++) {
      var tracksListDiv = document.getElementById("tracks-list");
      var tracks = data.tracks;
      $("#tracks-list").append(
      $("<li>").append(
          $("<a>").attr("href","#").append(
              $("<div>").attr("class", "track-title").append(tracks[i].title)
      )));
     }
  });
};

buildPlaylist("playlist-model.json");
