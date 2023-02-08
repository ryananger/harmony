var idCount = 0;

var Tile = function(Game, x, y) {
  const sq = Game.tilesize;

  const tile = {
    id: idCount++,
    next: null,

    solid: false,
    collides: false,
    repulsion: 10,

    x: x,
    y: y,
    cx: x/sq,
    cy: y/sq,
    box: {x: 4, y: 4, w: 56, h: 56},

    sq: sq,
    width: sq,
    height: sq,
    frame: function() {
      return Math.random() < 0.1 ? Math.floor(Math.random() * 5) : 0;
    }(),
    image: function() {
      var image = {
        element: new Image(),
        sq: sq
      };

      image.element.src = '../../public/tiles.png';
      return image;
    }(),
    nearCamera: function(cam) {
      return (
        tile.getDistance(cam) < 800
      );
    },
    getDistance: function(entry) {
      var distX = Math.abs((tile.x + (tile.width/2)) - (entry.x + (entry.width/2)));
      var distY = Math.abs((tile.y + (tile.height/2)) - (entry.y + (entry.height/2)));
      var dist = Math.sqrt((distX ** 2) + (distY ** 2));

      return dist;
    },
    draw: function(Game, ctx, cam) {
      var frame = tile.frame;
      var sq = tile.sq;

      ctx.drawImage(tile.image.element, frame * sq, 0, sq, sq, tile.x, tile.y, sq, sq);

      if (Game.showBoxes) {
        var box = tile.box;

        ctx.strokeRect(tile.x + box.x, tile.y + box.y, box.w, box.h);
      }

      return true;
    },
    update: function(Game) {
      // onTick updates should be defined in this function upon tile creation
    }
  }

  return tile;
};

export default Tile;

