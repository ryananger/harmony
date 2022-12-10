import Entity from './Entity.js';
import UI from './UI.js';

var Bulbasaur = function(x, y) {
  var bulbasaur = Entity(x, y);
  bulbasaur.baseVel = 1;
  bulbasaur.maxVel = 2;
  bulbasaur.collides = true;
  bulbasaur.solid = true;
  bulbasaur.drag = 20;

  var hp = UI(x, y);
  bulbasaur.healthBar = hp;
  hp.following = bulbasaur;
  hp.offX = -16;
  hp.offY = -24;

  var src = '../../public/bulbasprite.png';
  var hpSrc = '../../public/hp.png';
  var sprite = bulbasaur.newImage(src, true, 72);
  var hpImg =  hp.newImage(hpSrc, false, 18);

  sprite.animations = {
    bump:      {start: 12, length: 1},

    walkDown:  {start: 0, length: 3},
    walkLeft:  {start: 3, length: 3},
    walkUp:    {start: 6, length: 3},
    walkRight: {start: 9, length: 3}
  };

  sprite.frameDuration = 8;
  sprite.currentAnimation = 'walkDown';

  bulbasaur.getDirection = function() {
    var dir = ['Up', 'Down', 'Left', 'Right'];
    var index = Math.floor(Math.random() * 4);

    bulbasaur.direction = dir[index];
    bulbasaur.speed = bulbasaur.baseVel;

    sprite.currentAnimation = `walk${bulbasaur.direction}`;
  };

  bulbasaur.getDirection();

  bulbasaur.actions.walk = function(state) {
    if (Math.random() < 0.01) {
      bulbasaur.getDirection();
    }

    if (bulbasaur.speed < bulbasaur.maxVel) {
      bulbasaur.speed += bulbasaur.accel;
    }

    switch (bulbasaur.direction) {
      case 'Up':
        if (!bulbasaur.collisionCheck(bulbasaur.x, bulbasaur.y - bulbasaur.speed, state.entities, state.tiles)) {
          bulbasaur.y -= bulbasaur.speed;
        } else {
          bulbasaur.y += bulbasaur.speed;
          bulbasaur.actions.bump();
        }
        break;
      case 'Down':
        if (!bulbasaur.collisionCheck(bulbasaur.x, bulbasaur.y + bulbasaur.speed, state.entities, state.tiles)) {
          bulbasaur.y += bulbasaur.speed;
        } else {
          bulbasaur.y -= bulbasaur.speed;
          bulbasaur.actions.bump();
        }
        break;
      case 'Left':
        if (!bulbasaur.collisionCheck(bulbasaur.x - bulbasaur.speed, bulbasaur.y, state.entities, state.tiles)) {
          bulbasaur.x -= bulbasaur.speed;
        } else {
          bulbasaur.x += bulbasaur.speed;
          bulbasaur.actions.bump();
        }
        break;
      case 'Right':
        if (!bulbasaur.collisionCheck(bulbasaur.x + bulbasaur.speed, bulbasaur.y, state.entities, state.tiles)) {
          bulbasaur.x += bulbasaur.speed;
        } else {
          bulbasaur.x -= bulbasaur.speed;
          bulbasaur.actions.bump();
        }
        break;
    }
  };

  bulbasaur.actions.bump = function() {
    bulbasaur.idle = true;
    bulbasaur.collisions.map(function(col) {
      if (col.collision.isEntity) {
        sprite.currentAnimation = 'bump';
      }
    })

    setTimeout(function() {
      bulbasaur.idle = false;
      bulbasaur.speed = bulbasaur.baseVel;
      bulbasaur.getDirection();
    }, 1000);
  };

  var repulse = bulbasaur.repulse;
  bulbasaur.repulse = function() {
    repulse();
    bulbasaur.actions.bump();
  }

  var update = bulbasaur.update;
  bulbasaur.update = function(state, setState) {
    if (bulbasaur.following) {
      bulbasaur.follow(400);
    } else if (!bulbasaur.idle) {
      bulbasaur.actions.walk(state);
    }

    update(state);
  }

  return bulbasaur;
};

export default Bulbasaur;