Template.tweetsIndex.helpers({
  count: function() {
    return Tweets.find().fetch().length;
  },
  geo_count: function() {
    return Tweets.find({tweet_location:{$ne:null}}).fetch().length;
  },
  tweets: function() {
    return Tweets.find({tweet_location:{$ne:null}}, {limit: 5, sort: {tweet_timestamp: -1}});
  }
})
