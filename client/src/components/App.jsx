import React from 'react';
import {useEffect, useState, useRef} from 'react';

import Canvas from './Canvas.jsx';
import Dev from './DevBar.jsx';
import Game from './Game.js';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    fps: 60,
    camera: null,
    cameras: [],
    visibleUI: false,
    uis: [],

    player: null,
    entities: [],

    tiles: [],
    tilesize: 72,
    grid: {}
  });

  const canvasRef = useRef(null);

  useEffect(function() {
    Game.initTiles(state, setState);
    Game.newCamera(0, 0, state, setState);
  }, []);

  return (
    <div id="main">
      <Dev    state={state} setState={setState} />
      <Canvas state={state} setState={setState} canvasRef={canvasRef} />
    </div>
  )
}

export default App;

