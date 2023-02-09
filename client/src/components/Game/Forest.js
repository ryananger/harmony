var idCount = 0;

var Forest = function(x, y, sq) {
  const forest = {
    id: idCount++,
    next: null,

    x: x,
    y: y,
    cx: x/sq,
    cy: y/sq,
    box: {x: 0, y: 0, w: 64, h: 64},

    sq: sq,
    width: sq,
    height: sq,
    frame: Math.floor(Math.random() * 3),
    image: function() {
      var image = {
        element: new Image()
      };

      image.element.src = '../../public/forest.png';
      return image;
    }(),
    nearCamera: function(cam) {
      return (
        forest.getDistance(cam) < 800
      );
    },
    getDistance: function(entry) {
      var distX = Math.abs((forest.x + (forest.width/2)) - (entry.x + (entry.width/2)));
      var distY = Math.abs((forest.y + (forest.height/2)) - (entry.y + (entry.height/2)));
      var dist = Math.sqrt((distX ** 2) + (distY ** 2));

      return dist;
    },
    draw: function(Game, ctx, cam) {
      var frame = forest.frame;
      var width = forest.width;
      var height = forest.height;

      ctx.drawImage(forest.image.element, frame * width, 0, width, height, forest.x - width/2, forest.y - height/2, width, height);

      if (Game.showBoxes) {
        var box = forest.box;

        ctx.strokeRect(forest.x + box.x, forest.y + box.y, box.w, box.h);
      }

      return true;
    },
    update: function(Game) {
      // onTick updates should be defined in this function upon forest creation
    },
    onClick: function() {

    }
  }

  return forest;
};

export default Forest;

