Meteor.publish('tweets', function() {
  return Tweets.find();
});

Meteor.publish('points', function(options) {
  return Points.find({}, options);
});

Meteor.publish('point', function(latitude, longitude) {
  return Points.find({'latitude': latitude, 'longitude': longitude});
});
