import Entity from './Entity.js';
import UI from './UI.js';

var Leaf = function(x, y) {
  var leaf = Entity(x, y);
  leaf.baseVel = 1;
  leaf.maxVel = 2;
  leaf.collides = true;
  leaf.solid = false;
  leaf.drag = 20;

  var src = '../../public/leaf.png';
  var sprite = leaf.newImage(src, true, 72);

  sprite.animations = {
    spin: {start: 0, length: 4}
  };

  sprite.frameDuration = 8;
  sprite.currentAnimation = 'spin';

  var update = leaf.update;
  leaf.update = function(Game) {
    update(Game);
  }

  return leaf;
};

export default leaf;