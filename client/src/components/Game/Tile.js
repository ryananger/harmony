var idCount = 0;

var Tile = function(src, x, y, sq, frame) {
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
    box: {x: 0, y: 0, w: 0, h: 0},

    sq: sq,
    width: sq,
    height: sq,
    frame: frame,
    image: function() {
      var image = {
        element: new Image(),
        sq: sq
      };

      image.element.src = src;
      return image;
    }(),
    nearCamera: function(cam) {
      return (
        tile.x > cam.x - 1500 &&
        tile.x < cam.x + 1500 &&
        tile.y > cam.y - 1500 &&
        tile.y < cam.y + 1500
      );
    },
    draw: function(Game, ctx, cam) {
      var frame = tile.frame;
      var sq = tile.sq;

      ctx.drawImage(tile.image.element, frame * sq, 0, sq, sq, tile.x - (sq/2), tile.y - (sq/2), sq, sq);

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

