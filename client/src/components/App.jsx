import React from 'react';
import {useState, useRef} from 'react';

import Canvas from './Canvas.jsx';
import Dev from './DevBar.jsx';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    fps: 8,

    player: null,
    entities: []
  });

  const canvasRef = useRef(null);

  return (
    <div id="main">
      <Dev    state={state} setState={setState} />
      <Canvas canvasRef={canvasRef} state={state} />
    </div>
  )
}

export default App;

