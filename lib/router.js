Router.configure({
  layoutTemplate: 'layout'
})

Router.map(function() {

  this.route('tweets', {
    path: '/',
    template: 'tweetsIndex',
    waitOn: function() {
      return [Meteor.subscribe('tweets')];
    },
    data: function() {
      return {
        tweets: Tweets.find({}, {})
      }
    }
  });

})
