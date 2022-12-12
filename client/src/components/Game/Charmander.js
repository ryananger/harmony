import Entity from './Entity.js';
import UI from './UI.js';

var Charmander = function(x, y) {
  var charmander = Entity(x, y);
  charmander.baseVel = 1;
  charmander.maxVel = 1;
  charmander.collides = true;
  charmander.solid = true;
  charmander.drag = 20;

  charmander.box = {
    x: -16,
    y: -10,
    w: 32,
    h: 40
  };

  var hp = UI(x, y);
  charmander.healthBar = hp;
  hp.following = charmander;
  hp.offX = -16;
  hp.offY = -24;

  var src = '../../public/charsprite.png';
  var hpSrc = '../../public/hp.png';
  var sprite = charmander.newImage(src, true, 72);
  var hpImg =  hp.newImage(hpSrc, false, 18);

  sprite.animations = {
    bump:      {start: 12, length: 1},

    walkDown:  {start: 0, length: 3},
    walkLeft:  {start: 3, length: 3},
    walkUp:    {start: 6, length: 3},
    walkRight: {start: 9, length: 3}
  };

  sprite.frameDuration = 16;
  sprite.currentAnimation = 'walkDown';

  charmander.getDirection = function() {
    var dir = ['Up', 'Down', 'Left', 'Right'];
    var index = Math.floor(Math.random() * 4);

    charmander.direction = dir[index];
    charmander.speed = charmander.baseVel;

    sprite.currentAnimation = `walk${charmander.direction}`;
  };

  charmander.getDirection();

  charmander.actions.walk = function(Game) {
    if (Math.random() < 0.01) {
      charmander.getDirection();
    }

    if (charmander.speed < charmander.maxVel) {
      charmander.speed += charmander.accel;
    }

    switch (charmander.direction) {
      case 'Up':
        if (!charmander.collisionCheck(charmander.x, charmander.y - charmander.speed, Game.entities, Game.tiles)) {
          charmander.y -= charmander.speed;
        } else {
          charmander.y += charmander.speed;
          charmander.actions.bump();
        }
        break;
      case 'Down':
        if (!charmander.collisionCheck(charmander.x, charmander.y + charmander.speed, Game.entities, Game.tiles)) {
          charmander.y += charmander.speed;
        } else {
          charmander.y -= charmander.speed;
          charmander.actions.bump();
        }
        break;
      case 'Left':
        if (!charmander.collisionCheck(charmander.x - charmander.speed, charmander.y, Game.entities, Game.tiles)) {
          charmander.x -= charmander.speed;
        } else {
          charmander.x += charmander.speed;
          charmander.actions.bump();
        }
        break;
      case 'Right':
        if (!charmander.collisionCheck(charmander.x + charmander.speed, charmander.y, Game.entities, Game.tiles)) {
          charmander.x += charmander.speed;
        } else {
          charmander.x -= charmander.speed;
          charmander.actions.bump();
        }
        break;
    }
  };

  charmander.actions.bump = function() {
    charmander.idle = true;
    charmander.collisions.map(function(col) {
      if (col.collision.isEntity) {
        sprite.currentAnimation = 'bump';
      }
    })

    setTimeout(function() {
      charmander.idle = false;
      charmander.speed = charmander.baseVel;
      charmander.getDirection();
    }, 1000);
  };

  var repulse = charmander.repulse;
  charmander.repulse = function() {
    repulse();
    charmander.actions.bump();
  }

  var update = charmander.update;
  charmander.update = function(Game) {
    if (charmander.following) {
      charmander.follow(400);
    } else if (!charmander.idle) {
      charmander.actions.walk(Game);
    }

    update(Game);
  }

  return charmander;
};

export default Charmander;