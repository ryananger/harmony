import React from 'react';
import {useEffect, useState, useRef} from 'react';

import Canvas from './Canvas.jsx';
import Dev from './DevBar.jsx';
import Game from './Game.js';

var App = function() {
  const [tick, updateReact] = useState(0);
  const canvasRef = useRef(null);

  useEffect(function() {
    setTimeout(function() {
      updateReact(tick + 1);
    }, 100)
  }, [tick]);

  return (
    <div id="main">
      <Dev    Game={Game} />
      <Canvas Game={Game} canvasRef={canvasRef} />
    </div>
  )
}

export default App;

