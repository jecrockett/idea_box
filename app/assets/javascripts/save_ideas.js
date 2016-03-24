function newIdea() {
  $('#save-idea-btn').click(function(){
    var title = $('#new-idea-title').val();
    var body = $('#new-idea-body').val();
    $('#new-idea-title').val('');
    $('#new-idea-body').val('');
    saveIdea(title, body);
  });
}

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
