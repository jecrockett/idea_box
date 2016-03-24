function renderIdea(idea){
  $('#ideas-container').prepend(
    "<div id='idea-" + idea.id + "' class='idea'>" +
    "<div class='contents'><p class='title'>Title: " +
    idea.title +
    "</p><p class='quality'>Quality: " +
    idea.quality_in_words +
    "</p><p class='body'>Body: " +
    idea.truncated_body +
    "</p><p class='hidden full-body'>" +
    idea.body +
    "</p></div><div class='actions'>" +
    "<a href='#' id='increase-quality'><i class='fa fa-thumbs-up'></i></a>" +
    "<a href='#' id='decrease-quality'><i class='fa fa-thumbs-down'></i></a>" +
    "<a href='#' id='" + idea.id + "' class='delete'><i class='fa fa-trash'</i></a></div></div>"
  );
};

function renderIdeas(){
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
