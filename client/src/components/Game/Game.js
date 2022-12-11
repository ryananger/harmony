import Tile from './Tile.js';
import Camera from './Camera.js';

var tick = 0;
var renderTimeout;

var Game = {
  view: 'home',
  fps: 120,

  camera: null,
  player: null,
  visibleUi: false,

  cameras:  [],
  entities: [],
  uis:      [],

  tiles: [],
  tilesize: 72,
  grid: {},

  showBorders: true,
  showBoxes: false,

  initTiles: function() {
    var grid  = Game.grid;
    var tiles = Game.tiles;

    for (var i = -20; i < 21; i++) {
      grid[i] = {};

      for (var j = -20; j < 21; j++) {
       Game.addTile(i, j);
      }
    }
  },
  tileGen: function(player) {
    var grid  = Game.grid;
    var width = 25;
    var half = Math.floor(width/2);

    for (var i = -half; i < half; i++) {
      var chkX = player.cx + i;
      if (!grid.hasOwnProperty(chkX)) {
        grid[chkX] = {};
      }

      for (var j = -half; j < half; j++) {
        var chkY = player.cy + j;

        if (!grid[chkX].hasOwnProperty(chkY)) {
          Game.addTile(chkX, chkY);
        }
      }
    }
  },
  addTile: function(x, y) {
    var src = '../../public/tiles.png';
    var sq  = Game.tilesize;
    var tileX = x * sq;
    var tileY = y * sq;
    var tileFrame = Math.floor(Math.random() * 7);

    if (tileFrame === 0 && Math.random() < 0.7) {
      tileFrame++;
    }

    var tile = Tile(src, tileX, tileY, sq, tileFrame);

    if (tileFrame === 0) {
      tile.solid = true;
      tile.collides = true;
    }

    Game.grid[x][y] = tile;
    Game.tiles.unshift(tile);
  },

  newCamera: function(x, y) {
    var cam = Camera(x, y);

    Game.camera = cam;
    Game.cameras.unshift(cam);
    Game.entities.unshift(cam);
  },
  update: function(ctx, tick) {
    if (!Game.camera) {
      return;
    }

    var camera   = Game.camera;
    var offX = camera.x - (ctx.canvas.width/2);
    var offY = camera.y - (ctx.canvas.height/2);

    var all = [
      ...Game.tiles,
      ...Game.entities,
      ...Game.uis
    ];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(-offX, -offY);

    all.map(function(entry) {
      if (entry.nearCamera(camera)) {
        entry.update(Game);
        entry.draw(Game, ctx, camera, tick);
      }
    });

    ctx.restore();
  },
  gameLoop: function() {
    var ctx = document.getElementById('canvas').getContext('2d');

    var animId;
    var render = function() {
      clearTimeout(renderTimeout);
      tick++;
      Game.update(ctx, tick);

      renderTimeout = setTimeout(function() {
        animId = window.requestAnimationFrame(render);
      }, 1000/Game.fps);
    };

    render();

    return function() {
      window.cancelAnimationFrame(animId);
    };
  }
};

Game.initTiles();
Game.newCamera(0, 0);

window.Game = Game;

export default Game;