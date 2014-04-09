if (Meteor.isClient) {

  Template.hello.greeting = function () {
    return "Welcome to color.";
  };

  Template.hello.count = function() {
    return Tweets.find().fetch().length;
  }

  Template.hello.tweets = function() {
    return Tweets.find({});
  }

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {

  Meteor.startup(function () {

    Twit = new TwitMaker({
        consumer_key:         '2tC07cB1RQBCiDyFiix5sa9Vr'
      , consumer_secret:      'cvTOQQXO30DwR5yfHXatJkfc2i0EBZOZNM7wtv44P2PycH3J3f'
      , access_token:         '19301726-WkVQrqIkCpaJItbDkyTJzyQhAvbRZmGUQwt5Os5Pg'
      , access_token_secret:  'saXdIaHwqUbrQPjsnyiQBMkihHiNVN4Q0OtTHiR1EnF6F'
    });

    var stream = Twit.stream('statuses/filter', { track: '#toronto' });
    stream.on('tweet', Meteor.bindEnvironment(function(tweet) {
      Tweets.insert(tweet);
    }));

  });
}

Tweets = new Meteor.Collection('tweets');
