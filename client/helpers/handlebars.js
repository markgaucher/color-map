Handlebars.registerHelper('average', function(total, count) {
  return (total / count).toFixed(2);
})
