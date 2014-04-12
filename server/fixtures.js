Meteor.startup(function () {

  var analyze = Meteor.require('sentimental').analyze;


  // connect to Twitter
  Twit = new TwitMaker({
      consumer_key:         '2tC07cB1RQBCiDyFiix5sa9Vr'
    , consumer_secret:      'cvTOQQXO30DwR5yfHXatJkfc2i0EBZOZNM7wtv44P2PycH3J3f'
    , access_token:         '19301726-WkVQrqIkCpaJItbDkyTJzyQhAvbRZmGUQwt5Os5Pg'
    , access_token_secret:  'saXdIaHwqUbrQPjsnyiQBMkihHiNVN4Q0OtTHiR1EnF6F'
  });

  // draw a square from SW to NE
  var stream = Twit.stream('statuses/filter', { locations: '-132.0,23.0,-58.0,54.0' });
  stream.on('tweet', Meteor.bindEnvironment(function(tweet) {
    if(tweet.geo) {
      Points.upsert({
        'latitude' : Math.floor(tweet.geo.coordinates[0]),
        'longitude' : Math.floor(tweet.geo.coordinates[1])
      }, {
        $inc: {
          'mood' : analyze(tweet.text).score,
          'count' : 1
        }
      });
    }
    // Tweets.insert({
    //   tweet_timestamp: tweet.created_at,
    //   tweet_location: tweet.geo,
    //   tweet_place: tweet.place,
    //   tweet_text: tweet.text,
    //   tweet_score: analyze(tweet.text),
    //   tweet_entities: tweet.entities,
    // });
  }));


});
