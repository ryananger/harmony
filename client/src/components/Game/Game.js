import Tile from './Tile.js';
import Cliff from './Cliff.js';
import Camera from './Camera.js';

var tick = 0;
var renderTimeout;

var Game = {
  view: 'home',
  fps: 80,

  camera: null,
  player: null,
  visibleUi: false,

  cameras:  [],
  entities: [],
  uis:      [],

  tiles: [],
  tilesize: 64,
  grid: {},

  bg: new Image(),

  showBorders: false,
  showBoxes: false,

  initTiles: function() {
    var grid  = Game.grid;
    var tiles = Game.tiles;

    for (var i = -15; i <= 15; i++) {
      grid[i] = {};

      if (i % 2 === 0) {
        var cliff = Cliff(i*64, 0, 64);

        Game.entities.unshift(cliff);
      }

      for (var j = -12; j <= 12; j++) {
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
    var tileFrame = 0;

    if (Math.random() < 0.1) {
      tileFrame = Math.floor(Math.random() * 5);
    }

    var tile = Tile(src, tileX, tileY, sq, tileFrame);

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
    ctx.drawImage(Game.bg, -1600 + (ctx.canvas.width/2), -900 + (ctx.canvas.height/2));
    ctx.save();
    ctx.translate(-offX, -offY);

    all.map(function(entry) {

      entry.draw(Game, ctx, camera, tick);
      if (entry.nearCamera(camera)) {
        entry.update(Game);
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

Game.bg.src = '../../public/bg.png';
Game.initTiles();
Game.newCamera(0, 0);

window.Game = Game;

export default Game;