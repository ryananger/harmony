import React from 'react';
import {useState, useRef} from 'react';

import Canvas from './Canvas.jsx';
import Entity from './Entity.js';
import Dev from './DevBar.jsx';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    fps: 8,
    entities: []
  });

  // create ref to pass to canvas element
  const canvasRef = useRef(null);

  // draw function passed to canvas, clears canvas, renders each entity, and then updates each entity.
  var draw = function(ctx, tick) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    state.entities.forEach(function(ent) {
      ent.render(ctx);
      ent.update();
    })
  };

  return (
    <div id="main">
      <Dev    state={state} setState={setState} />
      <Canvas canvasRef={canvasRef} state={state} draw={draw}/>
    </div>
  )
}

export default App;

