import Entity from './Entity.js';

var Camera = function(x, y) {
  var camera = Entity(x, y);
  var src = '../../public/camera.png';
  camera.newImage(src, false, 32);
  camera.isCamera = true;
  camera.isVisible = true;

  camera.follow = function(distance) {
    if (camera.following) {
      var distX = Math.abs(camera.x - camera.following.x);
      var distY = Math.abs(camera.y - camera.following.y);
      var dist = distX + distY;

      if (dist > distance) {
        var stepX = Math.floor(distX/2);
        var stepY = Math.floor(distY/2);

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
      camera.follow(1);
    }
  }

  return camera;
};

export default Camera;