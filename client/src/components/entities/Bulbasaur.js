import Entity from './Entity.js';

var Bulbasaur = function(x, y) {
  var bulbasaur = Entity(x, y);
    var src = '../../public/bulbasprite.png';
    var sprite = bulbasaur.newImage(src, true, 72);

    sprite.animations = {
      walkDown:  {start: 0, length: 3},
      walkLeft:  {start: 3, length: 3},
      walkUp:    {start: 6, length: 3},
      walkRight: {start: 9, length: 3}
    };

    sprite.frameDuration = 8;
    sprite.currentAnimation = 'walkDown';

    bulbasaur.actions.walk = function() {
      bulbasaur.y += 10;
    };

    bulbasaur.update = function() {
      bulbasaur.actions.walk();
    }

    return bulbasaur;
};

export default Bulbasaur;