import Entity from './Entity.js';

var Camera = function(x, y) {
  var camera = Entity(x, y);
  // var src = '../../public/camera.png';
  // camera.newImage(src, false, 32);
  camera.isCamera  = true;
  camera.isVisible = true;
  camera.drag = 20;

  camera.follow = function(distance) {
    if (camera.following) {
      var distX = Math.abs(camera.x - camera.following.x);
      var distY = Math.abs(camera.y - camera.following.y);
      var dist  = Math.sqrt((distX ** 2) + (distY ** 2));

      if (dist > distance) {
        var stepX = Math.ceil(distX/camera.drag);
        var stepY = Math.ceil(distY/camera.drag);

        if (camera.x > camera.following.x) {
          camera.x -= stepX;
        } else {
          camera.x += stepX;
        }

        if (camera.y > camera.following.y) {
          camera.y -= stepY;
        } else {
          camera.y += stepY;
        }
      }
    }
  }

  camera.update = function() {
    if (camera.following) {
      camera.maxVel = camera.following.maxVel;
      camera.follow(5);
    }
  }

  return camera;
};

export default Camera;