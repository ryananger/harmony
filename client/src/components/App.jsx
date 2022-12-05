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

  const canvasRef = useRef(null);

  var draw = function(ctx, tick) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    console.log('in draw: ', state.entities.length, tick);

    state.entities.forEach(function(ent) {
      var img = ent.images[ent.currentImage];
      var sq = img.width;

      var frame;
      var cur = img.currentAnimation;

      if (img.animated) {
        frame = img.frame + img.animations[cur].start;
        img.frame++;

        if (img.frame >= img.sheetLength) {
          img.frame = 0;
        }
      } else {
        frame = 0;
      }

      ctx.drawImage(img.element, frame * sq, 0, sq, sq, ent.x, ent.y, sq, sq);
    })
  };

  return (
    <div id="main">
      {state.entities.length}
      <Dev    canvasRef={canvasRef} state={state} setState={setState} />
      <Canvas canvasRef={canvasRef} state={state} setState={setState} draw={draw}/>
    </div>
  )
}

export default App;

