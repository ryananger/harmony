var input = {
  mx: 0,
  my: 0,

  keysPressed: []
};

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

export default input;