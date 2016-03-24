function changeQuality(){
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
