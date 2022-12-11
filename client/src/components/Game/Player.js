import Entity from './Entity.js';
import Game from './Game.js';
import Leaf from './Leaf.js';
import input from './input.js';

var Player = function(x, y) {
  var player = Entity(x, y);
  player.baseVel = 2;
  player.speed = player.baseVel;
  player.isPlayer = true;
  player.collides = true;
  player.solid = true;

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

  player.actions.walk = function() {
    if (player.speed < player.maxVel) {
      player.speed += player.accel;
    }

    var speed = player.speed;

    if(input.keysPressed.length >= 2) {
      speed = Math.floor(speed/2);
    }

    input.keysPressed.map(function(key) {
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
  player.update = function(Game) {
    Game.tileGen(player);

    if (input.keysPressed.length > 0) {
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

    update(Game);
  }

  var onClick = player.onClick;
  player.onClick = function() {
    var diffX = input.mx - player.x;
    var diffY = input.my - player.y;
    var slope = diffX/diffY;

    var leaf = Leaf(player.x, player.y);

    leaf.slope = {val: slope, x: diffX, y: diffY};
    player.ignore.push(leaf);
    Game.entities.unshift(leaf);
  }

  return player;
};

export default Player;