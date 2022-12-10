var idCount = 0;

var UI = function(x, y, actions) {
  const ui = {
    id: idCount++,
    isUI: true,

    x: x,
    y: y,
    offX: 0,
    offY: 0,
    width: 0,
    height: 0,

    static: false,
    following: null,
    idle: false,
    drag: 1,

    isVisible: true,
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

      ui.width = image.width || 0;
      ui.height = image.height || 0;

      image.element.src = src;

      ui.images.push(image);
      return image;
    },
    nearCamera: function(cam) {
      return (
        ui.x > cam.x - 3000 &&
        ui.x < cam.x + 3000 &&
        ui.y > cam.y - 3000 &&
        ui.y < cam.y + 3000
      );
    },
    follow: function(distance) {
      var distX = Math.abs(ui.x - ui.following.x);
      var distY = Math.abs(ui.y - ui.following.y);
      var dist = Math.sqrt((distX ** 2) + (distY ** 2));

      if (dist > distance) {
        var stepX = distX/ui.drag;
        var stepY = distY/ui.drag;

        if (ui.x > ui.following.x) {
          ui.x -= stepX;
        } else {
          ui.x += stepX;
        }

        if (ui.y > ui.following.y) {
          ui.y -= stepY;
        } else {
          ui.y += stepY;
        }
      }
    },
    draw: function(Game, ctx, cam, tick) {
      if (Game.visibleUI) {
        var img = ui.images[ui.currentImage];

        if (!img) {
          return;
        }

        var sq = img.width;
        var frame;
        var cur = img.currentAnimation;

        if (img.animated) {
          if (!ui.idle) {
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

        ctx.drawImage(img.element, frame * sq, 0, sq, sq, ui.x + ui.offX - (sq/2), ui.y + ui.offY - (sq/2), sq, sq);

        return true;
      }
    },
    update: function() {
      ui.x = Math.ceil(ui.x);
      ui.y = Math.ceil(ui.y);

      if (ui.following) {
        ui.follow(1);
      }

      // onTick updates should be defined in this function upon entity creation
    }
  }

  return ui;
};

export default UI;

