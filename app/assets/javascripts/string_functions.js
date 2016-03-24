String.prototype.truncate = function(){
  var truncated = this.slice(0, 101);
  if (truncated.length < 101) {
    return truncated
  } else {
    for (var i = truncated.length; truncated[i] != " "; i--) {
      var trunc = truncated.slice(0, i)
    }
    return trunc + '...'
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
