import Tile from './Tile.js';
import Cliff from './Cliff.js';
import Tree from './Tree.js';
import Forest from './Forest.js';
import Camera from './Camera.js';

import input from './input.js';
import helpers from '../helpers.js';

var tick = 0;
var renderTimeout;

var Game = {
  view: 'home',
  fps: 80,

  camera: null,
  player: null,
  visibleUi: false,

  viewDist: 1400,
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

    var forest = Forest(0, 320, 128);

    Game.entities.push(forest);

    for (var i = -20; i <= 20; i++) {
      grid[i] = {};

      if (i % 2 === 0) {
        var cliff = Cliff(i*64, 0, 64);

        Game.entities.unshift(cliff);
      }

      var tree = Tree(i*64 + helpers.rand(18), 100 + helpers.rand(36), 64);
      var tree2 = Tree(i*64 + helpers.rand(48), 136 + helpers.rand(36), 64);

      Game.entities.unshift(tree);
      Game.entities.unshift(tree2);

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
      if (!grid[chkX]) {
        grid[chkX] = {};
      }

      for (var j = -half; j < half; j++) {
        var chkY = player.cy + j;

        if (!grid[chkX][chkY]) {
          Game.addTile(chkX, chkY);
        }
      }
    }
  },
  addTile: function(x, y) {
    var sq  = Game.tilesize;
    var tileX = x * sq;
    var tileY = y * sq;

    var tile = Tile(Game, tileX, tileY);

    Game.grid[x][y] = {tile: tile};
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

    var camera = Game.camera;
    Game.offX = camera.x - (ctx.canvas.width/2);
    Game.offY = camera.y - (ctx.canvas.height/2);

    var all = [
      ...Game.tiles,
      ...Game.entities,
      ...Game.uis
    ];

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(Game.bg, -1600 + (ctx.canvas.width/2), -900 + (ctx.canvas.height/2));
    ctx.save();
    ctx.translate(-Game.offX, -Game.offY);

    all.map(function(entry) {

      if (helpers.nearCamera(entry, camera, Game.viewDist)) {
        entry.draw(Game, ctx, camera, tick);
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

      animId = window.requestAnimationFrame(render);
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