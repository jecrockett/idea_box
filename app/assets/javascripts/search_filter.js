function searchFilter(){
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
}
