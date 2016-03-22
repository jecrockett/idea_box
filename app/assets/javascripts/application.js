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

  //$.getJSON('/ideas').then(function(){

  // });

  var renderIdeas = function(){
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
  };

  renderIdeas();

  var renderIdea = function(idea){
    $('#ideas-container').prepend(
      "<div id='idea-" + idea.id + "' class='idea'>" +
      "<div class='contents'><span class='title'>Title: " +
      idea.title +
      "</span><span class='quality'>Quality: " +
      idea.quality_in_words +
      "</span><p class='body'>Body: " +
      idea.truncated_body +
      "</p></div><div class='actions'>" +
      "<a href='#' id='increase-quality'>Increase</a>" +
      "<a href='#' id='decrease-quality'>Decrease</a>" +
      "<a href='#' id='" + idea.id + "' class='delete'>Delete</a></div></div>"
    );
  };

  $('#save-idea-btn').click(function(){
    var title = $('#new-idea-title').val();
    var body = $('#new-idea-body').val();
    $('#new-idea-title').val('');
    $('#new-idea-body').val('');

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: {
        idea: {
          title: title,
          body: body
        }
      },
      success: function(response){
        console.log("Idea created.");
        renderIdea(response);
      },
      error: function(xhr){
        console.log(xhr.responseText);
      }
    })
  });

  $('#ideas-container').on('click', 'a.delete', function(e){
    var id = $(this).closest('.idea').attr('id').replace('idea-', '');
    $(this).parents().eq(1).hide();

    $.ajax({
      type: 'DELETE',
      url: '/api/v1/ideas/' + id,
      success: function(response){
        console.log("Idea deleted.");
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    })
  });


  $('#ideas-container').on('click', 'a#increase-quality', function(e){
    var idea = $(this).closest('.idea');
    var id = idea.attr('id').replace('idea-', '');
    var oldQualityWord = idea.find('.quality').text().replace('Quality: ', '');
    var increasedQualityKey = { Genius: 3, Plausible: 3, Swill: 2 }
    var qualityKey = { 3: 'Genius', 2: 'Plausible', 1: 'Swill' }
    var newQualityWord = qualityKey[increasedQualityKey[oldQualityWord]]

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + id,
      data: {
        idea: {
          quality: increasedQualityKey[oldQualityWord]
        }
      },
      success: function(response) {
        console.log('Quality updated.')
        idea.find('.quality').html("Quality: " + newQualityWord);
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  });



});
