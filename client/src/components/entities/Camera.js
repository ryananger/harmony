import Entity from './Entity.js';

var Camera = function(x, y) {
  var camera = Entity(x, y);
  var src = '../../public/camera.png';
  camera.newImage(src, false, 32);

  camera.update = function() {
    if (!camera.x && camera.following) {
      camera.x = camera.following.x;
      camera.y = camera.following.y;
    }

    if (camera.following) {
      if (camera.x !== camera.following.x || camera.y !== camera.following.y) {
        if (camera.x > camera.following.x) {
          camera.x -= camera.speed;
        }
        if (camera.x < camera.following.x) {
          camera.x += camera.speed;
        }
        if (camera.y > camera.following.y) {
          camera.y -= camera.speed;
        }
        if (camera.y < camera.following.y) {
          camera.y += camera.speed;
        }
      }

      console.log(camera.x, camera.y);
    }
  }

  return camera;
};

export default Camera;