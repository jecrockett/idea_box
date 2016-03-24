function deleteIdea(){
  $('#ideas-container').on('click', 'a.delete', function(e){
    var id = $(this).closest('.idea').attr('id').replace('idea-', '');
    $(this).parents().eq(1).hide();
    deleteFromDatabase(id);
  });
}

function deleteFromDatabase(ideaId){
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
