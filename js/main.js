// EXPANSION OF THE EPISODES DIVS
$("body").on("click", "a.episodes", function() {
  $(this).toggleClass("episode-expanded");
  $(this).find(".additional-info").show();
});

$("body").on("click", "a.episode-expanded", function() {
  $(".additional-info").hide();
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
