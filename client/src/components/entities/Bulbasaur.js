import Entity from './Entity.js';

var Bulbasaur = function(x, y) {
  var bulbasaur = Entity(x, y);
  bulbasaur.baseVel = 1;
  bulbasaur.maxVel = 5;
  bulbasaur.solid = true;
  bulbasaur.drag = 20;

  var src = '../../public/bulbasprite.png';
  var sprite = bulbasaur.newImage(src, true, 72);

  sprite.animations = {
    walkDown:  {start: 0, length: 3},
    walkLeft:  {start: 3, length: 3},
    walkUp:    {start: 6, length: 3},
    walkRight: {start: 9, length: 3}
  };

  sprite.frameDuration = 4;
  sprite.currentAnimation = 'walkDown';

  bulbasaur.getDirection = function() {
    var dir = ['Up', 'Down', 'Left', 'Right'];
    var index = Math.floor(Math.random() * 4);

    bulbasaur.direction = dir[index];
    bulbasaur.speed = bulbasaur.baseVel;

    sprite.currentAnimation = `walk${bulbasaur.direction}`;
  };

  bulbasaur.getDirection();

  bulbasaur.actions.walk = function() {
    if (Math.random() < 0.01) {
      bulbasaur.getDirection();
    }

    if (bulbasaur.speed < bulbasaur.maxVel) {
      bulbasaur.speed += bulbasaur.accel;
    }

    switch (bulbasaur.direction) {
      case 'Up':
        bulbasaur.y -= bulbasaur.speed;
        break;
      case 'Down':
        bulbasaur.y += bulbasaur.speed;
        break;
      case 'Left':
        bulbasaur.x -= bulbasaur.speed;
        break;
      case 'Right':
        bulbasaur.x += bulbasaur.speed;
        break;
    }
  };

  bulbasaur.update = function() {
    if (bulbasaur.following) {
      bulbasaur.follow(400);
    } else {
      bulbasaur.actions.walk();
    }
  }

  return bulbasaur;
};

export default Bulbasaur;