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
      "<a href='#' id='increase-quality'><i class='fa fa-thumbs-up'></i></a>" +
      "<a href='#' id='decrease-quality'><i class='fa fa-thumbs-down'></i></a>" +
      "<a href='#' id='" + idea.id + "' class='delete'><i class='fa fa-trash'</i></a></div></div>"
    );
  };

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

  function saveIdea(ideaTitle, ideaBody){
    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: {
        idea: {
          title: ideaTitle,
          body: ideaBody
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
  };

  function deleteIdea(ideaId){
    $.ajax({
      type: 'DELETE',
      url: '/api/v1/ideas/' + ideaId,
      success: function(response){
        console.log("Idea deleted.");
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    })
  }

  function translateQuality(elem, word) {
    if (elem.is('#increase-quality')) {
      var increasedQualityKey = { Genius: 3, Plausible: 3, Swill: 2 }
      return increasedQualityKey[word];
    };
    if (elem.is('#decrease-quality')) {
      var decreasedQualityKey = { Genius: 2, Plausible: 1, Swill: 1 }
      return decreasedQualityKey[word];
    };
  }

  function updateQuality(id, idea, newNum, newWord){
    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + id,
      data: {
        idea: {
          quality: newNum
        }
      },
      success: function(response) {
        console.log('Quality updated.')
        idea.find('.quality').html("Quality: " + newWord);
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  }

  function toggleInputForm(input, elem, id) {
    elem.hide().after(input);
    input.focus();
    input.blur(function(){
      updateProperty(this, elem, id);
      $(this).remove();
      elem.show();
    })
    input.keydown(function(e) { if (e.which == 13) { input.blur(); }});
  }

  function updateProperty(form, element, id){
    var newValue = $(form).val();

    $.ajax({
      type: 'PUT',
      url: 'api/v1/ideas/' + id,
      data: {
        idea: {
          updateField: newValue
        }
      },
      success: function(response){
        console.log('Title updated.');
        element.html('Title: ' + newValue);
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    })
  }

  function sortIdeas(ideas, first){
    if (!first.hasClass('sorted')) {
      ideas.each(function(index, idea){
        $(idea).addClass('sorted');
      });

      return ideas.sort(function(a, b){
        var first =  $(a).find('p.quality').text().replace('Quality: ', '');
        var second = $(b).find('p.quality').text().replace('Quality: ', '');
        var qualityKey = {"Genius":    3,
                          "Plausible": 2,
                          "Swill":     1}
        return qualityKey[second] - qualityKey[first];
      });
    } else {
      return ideas.toArray().reverse()
    };
  }

  $('#save-idea-btn').click(function(){
    var title = $('#new-idea-title').val();
    var body = $('#new-idea-body').val();
    $('#new-idea-title').val('');
    $('#new-idea-body').val('');
    saveIdea(title, body);
  });

  $('#ideas-container').on('click', 'a.delete', function(e){
    var id = $(this).closest('.idea').attr('id').replace('idea-', '');
    $(this).parents().eq(1).hide();
    deleteIdea(id);
  });

  $('#ideas-container').on('click', 'a#increase-quality, a#decrease-quality', function(e){
    var element = $(this);
    var qualityKey = { 3: 'Genius', 2: 'Plausible', 1: 'Swill' }
    var idea = element.closest('.idea');
    var id = idea.attr('id').replace('idea-', '');
    var oldQualityWord = idea.find('.quality').text().replace('Quality: ', '');
    var newQualityNum = translateQuality(element, oldQualityWord)
    var newQualityWord = qualityKey[newQualityNum];
    updateQuality(id, idea, newQualityNum, newQualityWord);
  });

  $('#ideas-container').on('click', 'p.title, p.body', function(e){
    var element = $(this);
    var idea = element.closest('.idea')
    var id = idea.attr('id').replace('idea-', '');
    if (element.hasClass('title')) {
      var updateField = 'title'
      var oldValue = element.text().replace('Title: ', '');
    };
    if (element.hasClass('body')){
      var updateField = 'body'
      var oldValue = element.text().replace('Body: ', '');
    };
    var form = $("<input name='temp' type='text' value='" + oldValue + "'/>")
    toggleInputForm(form, element, id)
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
    var $firstIdea = $($ideas[0])
    var sortedIdeas = sortIdeas($ideas, $firstIdea)

    $('#ideas-container').empty();
    $(sortedIdeas).each(function(index, idea){
      $('#ideas-container').append(idea)
    });
  });

});
