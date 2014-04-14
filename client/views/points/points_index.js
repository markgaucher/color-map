Deps.autorun(function() {
  Meteor.subscribe("points", {
    onReady: function() {
      Session.set("active", true);
    }
  })
});

Template.pointsIndex.helpers({
  points: function() {
    if(Session.get("active")) {
      return Points.find({'latitude': {$gt: 210, $lt: 550}, 'longitude': {$gt: -1320, $lt: -580}}, {sort: {'latitude': 1, 'longitude': 1}});
    } else {
      return [];
    }
  }
});
