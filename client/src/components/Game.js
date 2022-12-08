import Tile from './entities/Tile.js';
import Camera from './entities/Camera.js';

var Game = {
  initTiles: function(state, setState) {
    var grid = state.grid;
    var tiles = state.tiles;

    for (var i = -10; i < 11; i++) {
      grid[i] = {};

      for (var j = -10; j < 11; j++) {
        var src = '../../public/tiles.png';
        var sq = state.tilesize;
        var tileX = (i) * sq;
        var tileY = (j) * sq;
        var tileFrame = Math.floor(Math.random() * 7);

        var tile = Tile(src, tileX, tileY, sq, tileFrame);

        if (tileFrame === 1) {
          tile.solid = true;
        }

        if (tile.id > 0) {
          tiles[tile.id - 1].next = tile;
        }

        grid[i][j] = tile;
        tiles.push(tile);
      }
    }

    setState({
      ...state,
      grid: grid,
      tiles: tiles
    });
  },
  newCamera: function(x, y, state, setState) {
    var cam = Camera(x, y);
    var cameras = state.cameras;
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
    var grid = state.grid;
    var tiles = state.tiles;

    for (var i = -20; i < 21; i++) {
      var chkX = player.cx + i;
      if (!grid.hasOwnProperty(chkX)) {
        grid[chkX] = {};
      }

      for (var j = -20; j < 21; j++) {
        var chkY = player.cy + j;

        if (!grid[chkX].hasOwnProperty(chkY)) {
          var src = '../../public/tiles.png';
          var sq = state.tilesize;
          var tileX = chkX * sq;
          var tileY = chkY * sq;
          var tileFrame = Math.floor(Math.random() * 7);

          var tile = Tile(src, tileX, tileY, sq, tileFrame);

          if (tileFrame === 1) {
            tile.solid = true;
          }

          grid[chkX][chkY] = tile;
          tiles.unshift(tile);

          setState({
            ...state,
            grid: grid,
            tiles: tiles
          });
        }
      }
    }
  }
}

export default Game;