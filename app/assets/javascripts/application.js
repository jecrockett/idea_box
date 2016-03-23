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
      "<div class='contents'><p class='title'>Title: " +
      idea.title +
      "</p><p class='quality'>Quality: " +
      idea.quality_in_words +
      "</p><p class='body'>Body: " +
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

  $('#ideas-container').on('click', 'a#decrease-quality', function(e){
    var idea = $(this).closest('.idea');
    var id = idea.attr('id').replace('idea-', '');
    var oldQualityWord = idea.find('.quality').text().replace('Quality: ', '');
    var decreasedQualityKey = { Genius: 2, Plausible: 1, Swill: 1 }
    var qualityKey = { 3: 'Genius', 2: 'Plausible', 1: 'Swill' }
    var newQualityWord = qualityKey[decreasedQualityKey[oldQualityWord]]

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + id,
      data: {
        idea: {
          quality: decreasedQualityKey[oldQualityWord]
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

  $('#ideas-container').on('click', 'p.title', function(e){
    // save the clicked element
    var element = $(this);
    // save which idea is being updated...necessary or not?
    var idea = element.closest('.idea')
    var id = idea.attr('id').replace('idea-', '');
    // save the clicked element's contents
    var ideaTitle = element.text().replace('Title: ', '');
    // save the temporary input to a variable
    var form = $("<input name='temp' type='text' value='" + ideaTitle + "'/>")
    // hide the clicked element and insert input field after with element value
    element.hide().after(form);
    // focus automatically on that input field
    form.focus();
    // when the focus comes off it, save the value
    form.blur(function(){
      var newTitle = $(this).val();
      // send ajax update with new value
      $.ajax({
        type: 'PUT',
        url: 'api/v1/ideas/' + id,
        data: {
          idea: {
            title: newTitle
          }
        },
        success: function(response){
          console.log('Title updated.');
          element.html('Title: ' + newTitle);
        },
        error: function(xhr) {
          console.log(xhr.responseText);
        }
      })
      // get ride of the input field
      $(this).remove();
      // re-show the hidden element
      element.show();
    })
    // allow user to enable blur by hitting return key
    form.keydown(function(e) { if (e.which == 13) { form.blur(); }});
  });

  $('#ideas-container').on('click', 'p.body', function(e){
    // save the clicked element
    var element = $(this);
    // save which idea is being updated...necessary or not?
    var id = element.closest('.idea').attr('id').replace('idea-', '');
    // save the clicked element's contents
    var ideaBody = element.text().replace('Body: ', '');
    // save the temporary input to a variable
    var form = $("<input name='temp' type='text' value='" + ideaBody + "'/>")
    // hide the clicked element and insert input field after with element value
    element.hide().after(form);
    // focus automatically on that input field
    form.focus();
    // when the focus comes off it, save the value
    form.blur(function(){
      var newBody = $(this).val();
      // send ajax update with new value
      $.ajax({
        type: 'PUT',
        url: 'api/v1/ideas/' + id,
        data: {
          idea: {
            body: newBody
          }
        },
        success: function(response){
          console.log('Body updated.');
          // update the hidden element with the new body
          element.html('Body: ' + newBody);
        },
        error: function(xhr) {
          console.log(xhr.responseText);
        }
      })
      // get ride of the input field
      $(this).remove();
      // re-show the hidden element
      element.show();
    })
    // allow user to enable blur by hitting return key
    form.keydown(function(e) { if (e.which == 13) { form.blur(); }});
  });

  $('#search-form').on('change, keyup', function(e){
    var searchTerm = $(this).val().toLowerCase();
    var $ideas = $('.idea')
    $ideas.show();
    for (var i = 0; i < $ideas.length; i++) {
      var ideaText = $($ideas[i]).find('p.title, p.body').text().replace('Title: ', '').replace('Body:', '').toLowerCase();
      if (ideaText.indexOf(searchTerm) === -1) {
        $($ideas[i]).hide();
      }
    }
  })

  $('#quality-filter').click(function(){
    var $ideas = $('.idea')
    var $first_idea = $($ideas[0])

    if (!$first_idea.hasClass('sorted')) {
      $ideas.sort(function(a, b){
        var first =  $(a).find('p.quality').text().replace('Quality: ', '');
        var second = $(b).find('p.quality').text().replace('Quality: ', '');
        var qualityKey = {"Genius":    3,
                          "Plausible": 2,
                          "Swill":     1}
        return qualityKey[second] - qualityKey[first];
      });

      $ideas.each(function(index, idea){
        $(idea).addClass('sorted');
      });
    } else {

      $ideas = $ideas.toArray().reverse()
    };

    $('#ideas-container').empty();
    $($ideas).each(function(index, idea){
      $('#ideas-container').append(idea)
    });
  });

});
