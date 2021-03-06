Router.configure({
  layoutTemplate: 'layout'
})

Router.map(function() {

  // this.route('tweets', {
  //   path: '/',
  //   template: 'tweetsIndex',
  //   waitOn: function() {
  //     return [Meteor.subscribe('tweets')];
  //   },
  //   data: function() {
  //     return {
  //       tweets: Tweets.find({}, {})
  //     }
  //   }
  // });

  this.route('points', {
    path: '/',
    template: 'pointsIndex',
    waitOn: function() {
      return [Meteor.subscribe('points'), {sort: {latitude: -1, longitude: -1}}];
    },
    data: function() {
      return {
        points: Points.find({}, {sort: {latitude: -1, longitude: -1}})
      };
    }
  })

})
