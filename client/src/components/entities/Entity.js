var idCount = 0;

var Entity = function(x, y, actions) {
  const entity = {
    id: idCount++,
    x: x,
    y: y,
    cx: Math.floor(x/72),
    cy: Math.floor(x/72),
    width: 0,
    height: 0,

    speed: 5,
    baseVel: 5,
    maxVel: 10,
    accel: 1,

    following: null,
    idle: false,
    drag: 1,

    isVisible: true,
    collides: false,
    collisions: [],
    repulsion: 1,

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
    collisionCheck: function(x, y, entities, tiles) {
      if (!entity.collides) {
        return;
      }

      var collisions = [];
      var check = function(entry) {
        if (!entry.solid) {
          return;
        }

        var distX = Math.abs((entity.x + (entity.width/2)) - (entry.x + (entry.width/2)));
        var distY = Math.abs((entity.y + (entity.height/2)) - (entry.y + (entry.height/2)));
        var dist = Math.sqrt((distX ** 2) + (distY ** 2));

        if (dist <= entry.width/2) {
          collisions.push(entry);
        }
      };

      entities.map(function(ent) {
        if (ent.id === entity.id) {
          return;
        }

        check(ent);
      });

      tiles.map(function(tile) {
        check(tile);
      });

      entity.collisions = collisions;

      if (entity.collisions.length === 0) {
        return false;
      } else {
        return true;
      }
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
          if (!entity.idle) {
            frame = img.frame + img.animations[cur].start;

            if (tick % img.frameDuration === 0) {
              img.frame++;

              if (img.frame >= img.animations[cur].length) {
                img.frame = 0;
              }
            }
          } else {
            frame = img.animations[cur].start;
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
        var dist = Math.sqrt((distX ** 2) + (distY ** 2));

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
    update: function(state, setState) {
      entity.cx = Math.floor(entity.x/72);
      entity.cy = Math.floor(entity.y/72);

      if (entity.collisions.length > 0) {
        if (entity.solid) {
          entity.collisions.map(function(col) {
            var cx = col.x;
            var cy = col.y;
            var ex1 = entity.x;
            var ex2 = entity.x + entity.width;
            var ey1 = entity.y;
            var ey2 = entity.y + entity.height;

            if (cx > ex1) {
              entity.x -= entity.repulsion + col.repulsion;
            }

            if (cx < ex1) {
              entity.x += entity.repulsion + col.repulsion;
            }

            if (cy > ey1) {
              entity.y -= entity.repulsion + col.repulsion;
            }

            if (cy < ey1) {
              entity.y += entity.repulsion + col.repulsion;
            }
          })
        }
      }

      // onTick updates should be defined in this function upon entity creation
    }
  }

  return entity;
};

export default Entity;

