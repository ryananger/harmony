var idCount = 0;

var Entity = function(x, y, actions) {
  const entity = {
    id: idCount++,
    x: x,
    y: y,
    speed: 20,
    images: [],
    currentImage: 0,
    actions: actions || {},
    newImage: function(src, isAnimated, width, height, x, y) {
      var image = {
        element: new Image(),
        animated: isAnimated,
        animations: {},
        currentAnimation: null,
        frameDuration: 1,
        frame: 0,
        sheetLength: 1,
        width: width || null,
        height: height || width || null,
        x: x,
        y: y
      };

      image.element.src = src;

      entity.images.push(image);
      return image;
    },
    nearCanvas: function(ctx) {
      return (
        entity.x > -200 &&
        entity.x < ctx.canvas.width + 200 &&
        entity.y > -200 &&
        entity.y < ctx.canvas.height + 200
      );
    },
    render: function(ctx) {
      if (entity.nearCanvas(ctx)) {
        var img = entity.images[entity.currentImage];
        var sq = img.width;

        var frame;
        var cur = img.currentAnimation;

        if (img.animated) {
          frame = img.frame + img.animations[cur].start;
          img.frame++;

          if (img.frame >= img.animations[cur].length) {
            img.frame = 0;
          }
        } else {
          frame = 0;
        }

        ctx.drawImage(img.element, frame * sq, 0, sq, sq, entity.x, entity.y, sq, sq);

        return true;
      }
    },
    update: function() {
      // onTick updates should be defined in this function upon entity creation
    }
  }

  return entity;
};

export default Entity;

