import Entity from './Entity.js';
import UI from './UI.js';

var Leaf = function(x, y) {
  var leaf = Entity(x, y);
  leaf.isProjectile = true;
  leaf.baseVel = 1;
  leaf.maxVel = 10;
  leaf.accel = 1;
  leaf.collides = true;
  leaf.solid = false;
  leaf.slope = {val: null, x: null, y: null};
  leaf.lifespan = 3;

  var src = '../../public/leaf.png';
  var sprite = leaf.newImage(src, true, 12);

  sprite.animations = {
    spin: {start: 0, length: 4}
  };

  sprite.frameDuration = 8;
  sprite.currentAnimation = 'spin';

  leaf.actions = {
    float: function() {
      if (leaf.speed < leaf.maxVel) {
        leaf.speed += leaf.accel;
      }

      var stepY = leaf.speed/(Math.sqrt((leaf.slope.val ** 2) + 1));
      var stepX = Math.sqrt((leaf.speed ** 2) - (stepY ** 2));

      if (leaf.slope.x < 0) {
        stepX = -stepX;
      }

      if (leaf.slope.y < 0) {
        stepY = -stepY;
      }

      leaf.x += stepX;
      leaf.y += stepY;
    }
  }

  var update = leaf.update;
  leaf.update = function(Game) {
    leaf.actions.float();
    update(Game);
  }

  return leaf;
};

export default Leaf;