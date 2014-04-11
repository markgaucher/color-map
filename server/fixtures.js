Meteor.startup(function () {

  console.log("Twitter initialized");

  Twit = new TwitMaker({
      consumer_key:         '2tC07cB1RQBCiDyFiix5sa9Vr'
    , consumer_secret:      'cvTOQQXO30DwR5yfHXatJkfc2i0EBZOZNM7wtv44P2PycH3J3f'
    , access_token:         '19301726-WkVQrqIkCpaJItbDkyTJzyQhAvbRZmGUQwt5Os5Pg'
    , access_token_secret:  'saXdIaHwqUbrQPjsnyiQBMkihHiNVN4Q0OtTHiR1EnF6F'
  });

  var stream = Twit.stream('statuses/filter', { locations: '-80,43,-79,44' });
  stream.on('tweet', Meteor.bindEnvironment(function(tweet) {
    Tweets.insert({
      tweet_timestamp: tweet.created_at,
      tweet_location: tweet.geo,
      tweet_place: tweet.place,
      tweet_entities: tweet.entities,
    });
  }));

});
