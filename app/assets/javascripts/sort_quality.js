function sortQuality(){
  $('#quality-filter').click(function(){
    var $ideas = $('.idea')
    var $firstIdea = $($ideas[0])
    var sortedIdeas = sortIdeas($ideas, $firstIdea)

    $('#ideas-container').empty();
    $(sortedIdeas).each(function(index, idea){
      $('#ideas-container').append(idea)
    });
  });
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
