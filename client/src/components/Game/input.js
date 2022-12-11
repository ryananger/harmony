import Game from './Game.js';

var input = {
  mx: 0,
  my: 0,
  clicks: 0,

  keysPressed: []
};

var keypressListener = function() {
  window.addEventListener('keydown', function (event) {
    if (input.keysPressed.indexOf(event.key) === -1 && event.key.match(/[wasd]/)) {
      input.keysPressed.unshift(event.key);
    };
  });

  window.addEventListener('keyup', function (event) {
    var copy = [];

    input.keysPressed.map(function(key) {
      if (key === event.key) {
        return;
      }

      copy.push(key);
    })

    input.keysPressed = copy;
  });
};

var mouseClickListener = function() {
  window.addEventListener('click', function (event) {
    if (event.target.id !== 'canvas') {
      return;
    }

    getMousePosition(event);
    input.clicks++;

    Game.entities.map(function(ent) {
      ent.onClick(input);
    })
  });
};

var getMousePosition = function(event) {
  var canvas = document.getElementById('canvas');
  var rect = canvas.getBoundingClientRect();

  input.mx = event.clientX + Game.camera.x - rect.left - (canvas.width/2);
  input.my = event.clientY + Game.camera.y - rect.top - (canvas.height/2);
};

keypressListener();
mouseClickListener();

export default input;