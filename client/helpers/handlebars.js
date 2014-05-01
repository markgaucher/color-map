Handlebars.registerHelper('average', function(total, count) {
  return (total / count).toFixed(2);
})

Handlebars.registerHelper('sentiment', function(total, count) {
  var mood = (total / count);
  if (mood > 1.0) { // 1.0
    return 'happier';
  } else if (mood > 0.05) { // 0.4
    return 'happy';
  } else if (mood > -0.05) { // 0.1
    return 'neutral';
  } else if (mood > -1.0) { // -1.0
    return 'sad';
  } else {
    return 'sadder';
  }
})

Handlebars.registerHelper('weight', function(count) {
  if (count > 1000) {
    return 'strong';
  } else {
    return 'normal';
  }
})

Handlebars.registerHelper('absolute', function(value) {
  return Math.abs(value);
})
