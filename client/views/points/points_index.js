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
      return Points.find({'latitude': {$gt: 21, $lt: 55}, 'longitude': {$gt: -132, $lt: -58}}, {sort: {'latitude': 1, 'longitude': 1}});
    } else {
      return [];
    }
  }
});
