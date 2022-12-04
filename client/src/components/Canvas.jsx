import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Entity from './Entity.js';

var Canvas = function(props) {
  const [state, setState] = props.state;
  const canvasRef = useRef(null);

  var draw = function(ctx, canvas) {
    // fitToContainer(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    state.entities.map(function(ent) {
      var img = ent.images[ent.currentImage];
      var sq = img.width;

      ctx.drawImage(img.element, 0, 0, sq, sq, ent.x, ent.y, sq, sq);
    })
  };

  // var fitToContainer = function (canvas) {
  //   canvas.style.width = '100%';
  //   canvas.style.height = '100%';
  //   canvas.width  = canvas.offsetWidth;
  //   canvas.height = canvas.offsetHeight;
  // };

  var mountCanvas = function() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    setState({
      ...state,
      canvas: canvas,
      ctx: ctx
    })

    setInterval(draw, 20, ctx, canvas);
  };

  useEffect(mountCanvas, []);

  return (
    <canvas ref={canvasRef} className='canvas' width='1280' height='720'>

    </canvas>
  )
};

export default Canvas;