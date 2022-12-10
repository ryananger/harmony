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
    render: function(ctx, cam) {
      var frame = tile.frame;
      var sq = tile.sq;

      ctx.drawImage(tile.image.element, frame * sq, 0, sq, sq, tile.x - (sq/2), tile.y - (sq/2), sq, sq);

      return true;
    },
    update: function() {
      // onTick updates should be defined in this function upon tile creation
    }
  }

  return tile;
};

export default Tile;
