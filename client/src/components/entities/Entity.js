var idCount = 0;

var Entity = function(x, y, actions) {
  const entity = {
    id: idCount++,
    x: x,
    y: y,
    width: 0,
    height: 0,
    speed: 5,
    baseVel: 5,
    maxVel: 20,
    accel: 1,
    following: null,
    drag: 1,
    isVisible: true,
    solid: false,
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

      entity.width = image.width || 0;
      entity.height = image.height || 0;

      image.element.src = src;

      entity.images.push(image);
      return image;
    },
    nearCamera: function(cam) {
      return (
        entity.x > cam.x - 3000 &&
        entity.x < cam.x + 3000 &&
        entity.y > cam.y - 3000 &&
        entity.y < cam.y + 3000
      );
    },
    collisionCheck: function(entities, tiles) {
      if (!entity.solid) {
        return;
      }

      var collisions = [];

      entities.map(function(chk) {
        if (!chk.solid) {
          return;
        }

        if (chk.id === entity.id) {
          return;
        }

        var distX = Math.abs(entity.x - chk.x);
        var distY = Math.abs(entity.y - chk.y);
        var dist = distX + distY;

        if (dist <= chk.width) {
          collisions.push(chk);
        }
      });

      tiles.map(function(chk) {
        if (!chk.solid) {
          return;
        }

        var distX = Math.abs(entity.x - chk.x);
        var distY = Math.abs(entity.y - chk.y);
        var dist = distX + distY;

        if (dist <= (chk.width/2)) {
          collisions.push(chk);
        }
      });

      // if (collisions.length > 0) {
      //   console.log('collision: ', true);
      // } else {
      //   console.log('collision: ', false);
      // }
    },
    render: function(ctx, cam, tick) {
      if (entity.nearCamera(cam) && entity.isVisible) {
        var img = entity.images[entity.currentImage];

        if (!img) {
          return;
        }

        var sq = img.width;
        var frame;
        var cur = img.currentAnimation;

        if (img.animated) {
          frame = img.frame + img.animations[cur].start;
          if (tick % img.frameDuration === 0) {
            img.frame++;

            if (img.frame >= img.animations[cur].length) {
              img.frame = 0;
            }
          }
        } else {
          frame = 0;
        }

        ctx.drawImage(img.element, frame * sq, 0, sq, sq, entity.x - (sq/2), entity.y - (sq/2), sq, sq);

        return true;
      }
    },
    follow: function(distance) {
      if (entity.following) {
        var distX = Math.abs(entity.x - entity.following.x);
        var distY = Math.abs(entity.y - entity.following.y);
        var dist = distX + distY;

        if (dist > distance) {
          var stepX = distX/entity.drag;
          var stepY = distY/entity.drag;

          if (entity.x > entity.following.x) {
            entity.x -= stepX;
          } else {
            entity.x += stepX;
          }

          if (entity.y > entity.following.y) {
            entity.y -= stepY;
          } else {
            entity.y += stepY;
          }
        }
      }
    },
    update: function() {
      // onTick updates should be defined in this function upon entity creation
    }
  }

  return entity;
};

export default Entity;

