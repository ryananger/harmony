var idCount = 0;

var Cliff = function(x, y, sq) {
  const cliff = {
    id: idCount++,
    next: null,

    x: x,
    y: y,
    cx: x/sq,
    cy: y/sq,
    box: {x: 0, y: 0, w: 128, h: 64},

    sq: sq,
    width: sq*2,
    height: sq,
    frame: Math.floor(Math.random() * 5),
    image: function() {
      var image = {
        element: new Image(),
        sq: sq
      };

      image.element.src = '../../public/cliffs.png';
      return image;
    }(),
    nearCamera: function(cam) {
      return (
        cliff.getDistance(cam) < 800
      );
    },
    getDistance: function(entry) {
      var distX = Math.abs((cliff.x + (cliff.width/2)) - (entry.x + (entry.width/2)));
      var distY = Math.abs((cliff.y + (cliff.height/2)) - (entry.y + (entry.height/2)));
      var dist = Math.sqrt((distX ** 2) + (distY ** 2));

      return dist;
    },
    draw: function(Game, ctx, cam) {
      var frame = cliff.frame;
      var width = cliff.width;
      var height = cliff.height;

      ctx.drawImage(cliff.image.element, frame * width, 0, width, height, cliff.x, cliff.y, width, height);

      if (Game.showBoxes) {
        var box = cliff.box;

        ctx.strokeRect(cliff.x + box.x, cliff.y + box.y, box.w, box.h);
      }

      return true;
    },
    update: function(Game) {
      // onTick updates should be defined in this function upon cliff creation
    },
    onClick: function() {

    }
  }

  return cliff;
};

export default Cliff;

