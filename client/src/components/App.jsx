import React from 'react';
import {useEffect, useState, useRef} from 'react';

import Canvas from './Canvas.jsx';
import Dev from './DevBar.jsx';
import Camera from './entities/Camera.js';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    fps: 8,
    camera: null,

    player: null,
    entities: []
  });

  const canvasRef = useRef(null);

  useEffect(function() {
    if (state.player) {
      var cam = Camera();
      cam.following = state.player;

      setState({
        ...state,
        camera: cam,
        entities: function() {
          state.entities.unshift(cam);
          return state.entities;
        }()
      })
    }
  }, [!state.player])

  return (
    <div id="main">
      <Dev    state={state} setState={setState} />
      <Canvas canvasRef={canvasRef} state={state} setState={setState} />
    </div>
  )
}

export default App;

