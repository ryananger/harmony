import Tile from './Tile.js';
import Camera from './Camera.js';

var Game = {
  view: 'home',
  fps: 60,

  camera: null,
  player: null,
  visibleUi: false,

  cameras:  [],
  entities: [],
  uis:      [],

  tiles: [],
  tilesize: 72,
  grid: {},
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
  newCamera: function(x, y) {
    var cam = Camera(x, y);

    Game.camera = cam;
    Game.cameras.unshift(cam);
    Game.entities.unshift(cam);
  },
  tileGen: function(player) {
    var grid  = Game.grid;
    var width = 20;

    for (var i = Math.floor(-width/2); i < Math.ceil(width/2); i++) {
      var chkX = player.cx + i;
      if (!grid.hasOwnProperty(chkX)) {
        grid[chkX] = {};
      }

      for (var j = Math.floor(-width/2); j < Math.ceil(width/2); j++) {
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
  }
};

Game.initTiles();
Game.newCamera(0, 0);

export default Game;