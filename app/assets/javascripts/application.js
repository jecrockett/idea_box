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
    $('#ideas-container').prepend(
      "<div id='idea-" +
      idea.id +
      "' class='idea'><p class='title'>Title: " +
      idea.title +
      "</p><p class='body'>Body: " +
      idea.truncated_body +
      "</p><p class='quality'>Quality: " +
      idea.quality_in_words +
      "</p></div>"
    );
  };

  $('#save-idea-btn').click(function(){
    // grab the value in the title field
    var title = $('#new-idea-title').val();
    // grab the value in the body field
    var body = $('#new-idea-body').val();
    // clear the title field
    $('#new-idea-title').val('');
    // clear the body field
    $('#new-idea-body').val('');
    // send ajax request to create idea
    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: {
        idea: {
          title: title,
          body: body
        }
      },
      // on success, append that idea info to the page
      success: function(response){
        console.log("Idea created.");
        renderIdea(response);
      },
      error: function(xhr){
        console.log(xhr.responseText)
      }
    })
  });

});
