var idCount = 0;

var Entity = function(x, y, actions) {
  const entity = {
    id: idCount++,
    isEntity: true,
    isLive: true,
    isProjectile: false,
    lifespan: null,
    timeout: null,

    x: x,
    y: y,
    cx: Math.floor(x/72),
    cy: Math.floor(x/72),
    box: {x: 0, y: 0, w: 0, h: 0},
    width: 0,
    height: 0,

    speed: 2,
    baseVel: 2,
    maxVel: 5,
    accel: 1,

    following: null,
    idle: false,
    drag: 1,

    isVisible: true,
    collides: false,
    collisions: [],
    colliding: false,
    repulsion: 2,

    images: [],
    currentImage: 0,
    actions: actions || {},
    ignore: [],
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
        entity.getDistance(cam) < 800
      );
    },
    getDistance: function(entry) {
      var distX = Math.abs((entity.x + (entity.width/2)) - (entry.x + (entry.width/2)));
      var distY = Math.abs((entity.y + (entity.height/2)) - (entry.y + (entry.height/2)));
      var dist = Math.sqrt((distX ** 2) + (distY ** 2));

      return dist;
    },
    collisionCheck: function(x, y, entities, tiles) {
      if (!entity.collides || !entity.nearCamera) {
        return;
      }

      var collisions = [];
      var check = function(entry) {
        if (!entry.collides || entity.ignore.indexOf(entry) !== -1) {
          return;
        }

        var dist = entity.getDistance(entry);

        if (dist > entity.width*2) {
          return;
        }

        var box1 = {
          ...entity.box,
          x: x + entity.box.x,
          y: y + entity.box.y
        };

        var box2 = {
          ...entry.box,
          x: entry.x + entry.box.x,
          y: entry.y + entry.box.y
        };

        if (box1.x < box2.x + box2.w &&
            box1.x + box1.w > box2.x &&
            box1.y < box2.y + box2.h &&
            box1.y + box1.h > box2.y) {

            collisions.push({collision: entry, box1: box1, box2: box2});
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

      if (collisions.length > 0) {
        return true;
      } else {
        return false;
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
    repulse: function() {
      if (entity.solid) {
        entity.collisions.map(function(entry) {
          if (entry.collision.solid) {
            var col = entry.collision;

            var cx = col.x;
            var cy = col.y;
            var ex1 = entity.x;
            var ex2 = entity.x + entity.width;
            var ey1 = entity.y;
            var ey2 = entity.y + entity.height;
            var distX = entry.distX;
            var distY = entry.distY;

            if (distX > distY) {
              if (cx > ex1) {
                entity.x -= entity.repulsion + col.repulsion;
              } else {
                entity.x += entity.repulsion + col.repulsion;
              }
            } else {
              if (cy > ey1) {
                entity.y -= entity.repulsion + col.repulsion;
              } else{
                entity.y += entity.repulsion + col.repulsion;
              }
            }
          }
        })
      }
    },
    draw: function(Game, ctx, cam, tick) {
      if (entity.isVisible && entity.isLive) {
        var img = entity.images[entity.currentImage];

        if (!img) {
          return;
        }

        var sq = img.width;
        var frame;
        var cur = img.currentAnimation;

        if (Game.showBorders) {
          ctx.strokeRect(entity.x - (sq/2), entity.y - (sq/2), sq, sq);
        }

        if (Game.showBoxes) {
          var box = entity.box;

          ctx.strokeRect(entity.x + box.x, entity.y + box.y, box.w, box.h);
        }

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
    update: function(Game) {
      if (entity.isLive) {
        if (!entity.isProjectile) {
          entity.x = Math.ceil(entity.x);
          entity.y = Math.ceil(entity.y);
        }

        entity.cx = Math.floor(entity.x/72);
        entity.cy = Math.floor(entity.y/72);

        entity.collisionCheck(entity.x, entity.y, Game.entities, Game.tiles);

        if (entity.collisions.length > 0) {
          // entity.repulse();
        }

        if (entity.lifespan && !entity.timeout) {
          entity.timeout = setTimeout(entity.destroy, entity.lifespan * 1000);
        }

        // onTick updates should be defined in this function upon entity creation
      }
    },
    destroy: function() {
      var entities = [];

      Game.entities.map(function(ent) {
        if (ent.id !== entity.id) {
          entities.push(ent);
        }
      });

      entity.isLive = false;
      Game.entities = entities;
    },

    onClick: function(input) {
      var ex = entity.x - entity.width/2;
      var ey = entity.y - entity.width/2;
      var mx = input.mx;
      var my = input.my;

      if (mx > ex && mx < ex + entity.width &&
          my > ey && my < ey + entity.height) {
          console.log('Clicked on entity: ', entity);
      }
    }
  }

  return entity;
};

export default Entity;

