var helpers = {
  rand: function(num) {
    return Math.floor(Math.random() * num);
  },
  getDistance: function(from, entry, all) {
    var distX = Math.abs((from.x + (from.width/2)) - (entry.x + (entry.width/2)));
    var distY = Math.abs((from.y + (from.height/2)) - (entry.y + (entry.height/2)));
    var dist = Math.sqrt((distX ** 2) + (distY ** 2));

    if (all) {
      return {distX, distY, dist};
    }

    return dist;
  },
  nearCamera: function(obj, cam, dist) {
    return helpers.getDistance(obj, cam) < dist;
  },
};

export default helpers;