import Entity from './Entity.js';

var Player = function(x, y) {
  var player = Entity(x, y);
  var src = '../../public/playersprite.png';
  var sprite = player.newImage(src, true, 72);

  sprite.animations = {
    idle:      {start: 0, length: 1},

    walkDown:  {start: 0, length: 3},
    walkLeft:  {start: 3, length: 3},
    walkUp:    {start: 6, length: 3},
    walkRight: {start: 9, length: 3}
  };

  sprite.frameDuration = 8;
  sprite.currentAnimation = 'idle';

  return player;
};

export default Player;