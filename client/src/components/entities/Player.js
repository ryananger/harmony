import Entity from './Entity.js';
import Game from '../Game.js';

var Player = function(x, y) {
  var player = Entity(x, y);
  player.baseVel = 2;
  player.speed = player.baseVel;
  player.isPlayer = true;
  player.collides = true;
  player.solid = true;

  var src = '../../public/playersprite.png';
  var sprite = player.newImage(src, true, 72);
  var keysPressed = [];

  sprite.animations = {
    idle:      {start: 0, length: 1},

    walkDown:  {start: 0, length: 3},
    walkLeft:  {start: 3, length: 3},
    walkUp:    {start: 6, length: 3},
    walkRight: {start: 9, length: 3}
  };

  sprite.frameDuration = 8;
  sprite.currentAnimation = 'idle';

  player.actions.walk = function() {
    if (player.speed < player.maxVel) {
      player.speed += player.accel;
    }

    var speed = player.speed;

    if(keysPressed.length >= 2) {
      speed = Math.floor(speed/2);
    }

    keysPressed.map(function(key) {
      switch (key) {
        case 'w':
          player.y -= speed;
          sprite.currentAnimation = 'walkUp';
          break;
        case 'a':
          player.x -= speed;
          sprite.currentAnimation = 'walkLeft';
          break;
        case 's':
          player.y += speed;
          sprite.currentAnimation = 'walkDown';
          break;
        case 'd':
          player.x += speed;
          sprite.currentAnimation = 'walkRight';
          break;
      };
    });
  };

  var update = player.update;
  player.update = function(state, setState) {
    Game.tileGen(state, setState, player);

    if (keysPressed.length > 0) {
      player.actions.walk();
    } else {
      if (sprite.currentAnimation != 'idle') {
        setTimeout(function() {
          player.speed = player.baseVel;
          sprite.currentAnimation = 'idle';
          sprite.frame = 0;
        }, 100);
      }
    }

    update(state);
  }

  window.addEventListener('keydown', function (event) {
    if (keysPressed.indexOf(event.key) === -1 && event.key.match(/[wasd]/)) {
      keysPressed.unshift(event.key);
    };
  });

  window.addEventListener('keyup', function (event) {
    var copy = [];

    keysPressed.map(function(key) {
      if (key === event.key) {
        return;
      }

      copy.push(key);
    })

    keysPressed = copy;
  });

  return player;
};

export default Player;