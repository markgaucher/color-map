Meteor.startup(function () {

  // include sentiment
  var sentiment = Meteor.require('sentiment');

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
      // calculate score
      var score = 0;
      sentiment(tweet.text, function(err, result) {
        score = result.score;
      })
      // update or insert database
      Points.upsert({
        'latitude' : round(tweet.geo.coordinates[0]),
        'longitude' : round(tweet.geo.coordinates[1])
      }, {
        $inc: {
          'mood' : score,
          'count' : 1
        },
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

  // round to nearest whole number or half
  round = function(val) {
    return 5 * Math.round((val * 10) / 5);
  }

});
