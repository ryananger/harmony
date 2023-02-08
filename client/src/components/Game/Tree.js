var idCount = 0;

var Tree = function(x, y, sq) {
  const tree = {
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

      image.element.src = '../../public/trees.png';
      return image;
    }(),
    nearCamera: function(cam) {
      return (
        tree.getDistance(cam) < 800
      );
    },
    getDistance: function(entry) {
      var distX = Math.abs((tree.x + (tree.width/2)) - (entry.x + (entry.width/2)));
      var distY = Math.abs((tree.y + (tree.height/2)) - (entry.y + (entry.height/2)));
      var dist = Math.sqrt((distX ** 2) + (distY ** 2));

      return dist;
    },
    draw: function(Game, ctx, cam) {
      var frame = tree.frame;
      var width = tree.width;
      var height = tree.height;

      ctx.drawImage(tree.image.element, frame * width, 0, width, height, tree.x - width/2, tree.y - height/2, width, height);

      if (Game.showBoxes) {
        var box = tree.box;

        ctx.strokeRect(tree.x + box.x, tree.y + box.y, box.w, box.h);
      }

      return true;
    },
    update: function(Game) {
      // onTick updates should be defined in this function upon tree creation
    },
    onClick: function() {

    }
  }

  return tree;
};

export default Tree;

