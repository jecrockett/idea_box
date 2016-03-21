// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){

  // on load, hit the ideas api to pull ideas
  $.ajax({
    type: 'GET',
    url: '/api/v1/ideas',
    success: function(response){
      console.log("Fetched ideas.");

      $.each(response, function(index, idea){
        renderIdea(idea);
      });
    },
    error: function(xhr){
      console.log(xhr.responseText);
    }
  });

  var renderIdea = function(idea){
    $('#ideas-container').append(
      "<div class='idea'><span class='title'>" +
      idea.title +
      "</span><p class='body'>" +
      idea.body +
      "</p><span class='quality'>" +
      idea.quality +
      "</span></div>"
    );
  };

});
