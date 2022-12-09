var idCount = 0;

var Tile = function(src, x, y, sq, frame) {
  const tile = {
    id: idCount++,
    solid: false,
    repulsion: 4,
    next: null,
    x: x,
    y: y,
    cx: x/sq,
    cy: y/sq,
    sq: sq,
    width: sq,
    height: sq,
    image: function() {
      var image = {
        element: new Image(),
        sq: sq
      };

      image.element.src = src;
      return image;
    }(),
    frame: frame,
    nearCamera: function(cam) {
      return (
        tile.x > cam.x - 3000 &&
        tile.x < cam.x + 3000 &&
        tile.y > cam.y - 3000 &&
        tile.y < cam.y + 3000
      );
    },
    render: function(ctx, cam) {
      if (tile.nearCamera(cam)) {
        var frame = tile.frame;
        var sq = tile.sq;

        ctx.drawImage(tile.image.element, frame * sq, 0, sq, sq, tile.x - (sq/2), tile.y - (sq/2), sq, sq);

        return true;
      }
    },
    update: function() {
      // onTick updates should be defined in this function upon tile creation
    }
  }

  return tile;
};

export default Tile;

