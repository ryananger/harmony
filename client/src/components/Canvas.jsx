import React from 'react';
import {useEffect, useRef} from 'react';
import axios from 'axios';

import Entity from './Entity.js';

var tick = 0;

var Canvas = function(props) {
  const canvasRef = useRef(null);

  var draw = function(state, ctx, tick) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    state.entities.map(function(ent) {
      var img = ent.images[ent.currentImage];
      var sq = img.width;

      ctx.drawImage(img.element, 0, 0, sq, sq, ent.x, ent.y, sq, sq);
    })
  };

  var mountCanvas = function() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    var render = function() {
      tick++;
      draw(props.state, ctx, tick);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    props.setState({
      ...props.state,
      canvas: canvas,
      ctx: ctx
    });
  };

  useEffect(mountCanvas, [props.state.entities]);

  return (
    <canvas ref={canvasRef} className='canvas' width='1280' height='720' />
  )
};

export default Canvas;