import React from 'react';
import {useEffect, useState, useRef} from 'react';

import Canvas from './Canvas.jsx';
import Dev from './DevBar.jsx';
import Camera from './entities/Camera.js';
import Tile from './entities/Tile.js';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    fps: 24,
    camera: null,
    cameras: [],

    player: null,
    entities: [],
    tiles: [],
    tilesize: 72
  });

  const canvasRef = useRef(null);

  var newCamera = function(x, y) {
    var cam = Camera(x, y);

    setState({
      ...state,
      camera: cam,
      cameras: function() {
        state.cameras.unshift(cam);
        return state.cameras;
      }(),
      entities: function() {
        state.entities.unshift(cam);
        return state.entities;
      }()
    })
  };

  useEffect(function() {
    for (var i = 0; i < 40; i++) {
      for (var j = 0; j < 40; j++) {
        setState({
          ...state,
          tiles: function() {
            var src = '../../public/tiles.png';
            var sq = state.tilesize;
            var tileX = (-20 + i) * sq;
            var tileY = (-20 + j) * sq;
            var tileFrame = Math.floor(Math.random() * 7);

            var tile = Tile(src, tileX, tileY, sq, tileFrame);
            if (tileFrame === 1) {
              tile.solid = true;
            }

            state.tiles.unshift(tile);
            return state.tiles;
          }()
        })
      }
    }

    newCamera(0, 0);
  }, []);

  return (
    <div id="main">
      <Dev    state={state} setState={setState} />
      <Canvas canvasRef={canvasRef} state={state} setState={setState} />
    </div>
  )
}

export default App;

