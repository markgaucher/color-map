Handlebars.registerHelper('average', function(total, count) {
  return (total / count).toFixed(2);
})

Handlebars.registerHelper('sentiment', function(total, count) {
  var mood = (total / count);
  if (mood > 1.0) {
    return 'happier';
  } else if (mood > 0.5) {
    return 'happy';
  } else if (mood > 0) {
    return 'neutral';
  } else if (mood > -1.0) {
    return 'sad';
  } else {
    return 'sadder';
  }
})

Handlebars.registerHelper('weight', function(count) {
  if (count > 5000) {
    return 'strong';
  } else if (count > 500) {
    return 'normal';
  } else {
    return 'light';
  }
})

Handlebars.registerHelper('absolute', function(value) {
  return Math.abs(value);
})
