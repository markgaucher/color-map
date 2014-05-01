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
          'mood' : score, // score * (0.1 ^ t)
          'count' : 1
        },
      });
    }
  }));

  var lat = 230,
    t = 0,
    i = 0;
  Meteor.setInterval(function() {
    Points.find({
      'latitude' : lat
    }).forEach(function(point) {
      if(point.mood) {
        // console.log("(" + (point.latitude / 10) + ", " + (point.longitude / 10) + ") changed from " + point.mood + " to " + (point.mood + (-point.mood * 0.1)));
        Points.update({
          '_id' : point._id
        }, {
          $inc: {
            'mood' : -(point.mood * 0.3),
            'count' : -(point.count * 0.3)
          }
        });
      }
    });
    // possible once Meteor supports MongoDB 2.6
    // -----------------------------------------
    // Points.update({
    //   'latitude' : lat
    // }, {
    //   $mul: {
    //     'mood' : 0.2
    //   }
    // }, { 'multi' : true }
    // );
    lat += 5;
    i++;
    if(i % 66 === 0) { t++; lat = 230; }
  }, 250);

  // round to nearest whole number or half
  round = function(val) {
    return 5 * Math.round((val * 10) / 5);
  }



});
