Handlebars.registerHelper('average', function(total, count) {
  return (total / count).toFixed(2);
})

Handlebars.registerHelper('positive', function(mood) {
  if (mood > 0) {
    return true;
  } else {
    return false;
  }
})

Handlebars.registerHelper('absolute', function(value) {
  return Math.abs(value);
})
