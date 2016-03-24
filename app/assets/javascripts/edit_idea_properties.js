function editProperty() {
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
      var oldValue = element.siblings('.hidden').text();
    };
    var form = $("<input name='temp' type='text' value='" + oldValue + "'/>")
    toggleInputFormAndElement(form, element, updateField, id)
  });
}

function toggleInputFormAndElement(input, elem, updateField, id) {
  elem.hide().after(input);
  input.focus();
  input.blur(function(){
    updateProperty(this, elem, updateField, id);
    $(this).remove();
    elem.show();
  })
  input.keydown(function(e) { if (e.which == 13) { input.blur(); }});
}

function updateProperty(form, element, updateField, id){
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
      console.log(updateField.capitalize() + ' updated.');
      element.html(updateField.capitalize() + ": " + newValue.truncate());
      element.siblings('.hidden').html(newValue);
    },
    error: function(xhr) {
      console.log(xhr.responseText);
    }
  })
}
