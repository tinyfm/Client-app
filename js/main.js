function buildPlaylist(json) {
  $.getJSON(json, function(data) {
    for (var i=0; i<data.tracks.length; i++) {
      var tracksListDiv = document.getElementById("tracks-list");
      var tracks = data.tracks;
      var title = tracks[i].title;
      var artist = tracks[i].artist;
      var type = tracks[i].type;
      var duration = tracks[i].duration;

      $("#tracks-list").append(
        "<li><a href='#' class='episodes'><div class='track-title'><i class='fa fa-play-circle'></i>  " + title + "</div><br>" + "<small class='track-author'>" + artist + " -  " + type + " -  " + duration + "</small><div class='add-to-queue'>Add to queue</div></a></li>");
     }
  });
};

buildPlaylist("playlist-model.json");

// EXPANSION OF THE EPISODES DIVS
$("body").on("click", "a.episodes", function() {
  $(this).toggleClass("episode-expanded");
});

// PROGRESS BAR STYLING AND ANIMATION
$(document).ready(function() {
  var progressbar = $('#progressbar'),
      max = progressbar.attr('max'),
      time = (1000 / max) * 5,
      value = progressbar.val();

  var loading = function() {
    value += 1;
    addValue = progressbar.val(value);

    $('.progress-value').html(value + '%');
      if (value == max) {
        clearInterval(animate);
      }
  };

  var animate = setInterval(function() {
    loading();
  }, time);
});
