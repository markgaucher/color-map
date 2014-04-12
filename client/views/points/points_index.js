Template.pointsIndex.helpers({
  points: function() {
    return Points.find({'latitude': {$gt: 21, $lt: 55}, 'longitude': {$gt: -132, $lt: -58}}, {sort: {'latitude': 1, 'longitude': 1}});
  }
})
