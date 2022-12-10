import Tile from './entities/Tile.js';
import Camera from './entities/Camera.js';

var Game = {
  num: 0,
  numInc: function() {
    setInterval(function() {
      Game.num++
    }, 1000);
  }(),
  initTiles: function(state, setState) {
    var grid  = state.grid;
    var tiles = state.tiles;

    for (var i = -20; i < 21; i++) {
      grid[i] = {};

      for (var j = -20; j < 21; j++) {
       Game.addTile(i, j, state, setState);
      }
    }
  },
  newCamera: function(x, y, state, setState) {
    var cam = Camera(x, y);
    var cameras  = state.cameras;
    var entities = state.entities;

    cameras.unshift(cam);
    entities.unshift(cam);

    setState({
      ...state,
      camera: cam,
      cameras: cameras,
      entities: entities
    })
  },
  tileGen: function(state, setState, player) {
    var grid  = state.grid;
    var tiles = state.tiles;
    var width = 20;

    for (var i = Math.floor(-width/2); i < Math.ceil(width/2); i++) {
      var chkX = player.cx + i;
      if (!grid.hasOwnProperty(chkX)) {
        grid[chkX] = {};
      }

      for (var j = Math.floor(-width/2); j < Math.ceil(width/2); j++) {
        var chkY = player.cy + j;

        if (!grid[chkX].hasOwnProperty(chkY)) {
          Game.addTile(chkX, chkY, state, setState);
        }
      }
    }
  },
  addTile: function(x, y, state, setState) {
    var grid  = state.grid;
    var tiles = state.tiles;
    var src = '../../public/tiles.png';
    var sq  = state.tilesize;
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

    grid[x][y] = tile;
    tiles.unshift(tile);

    setState({
      ...state,
      grid: grid,
      tiles: tiles
    });
  }
};

export default Game;