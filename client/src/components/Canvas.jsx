import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Entity from './Entity.js';

var tick = 0;

var Canvas = function(props) {
  const [mounted, setMounted] = useState(false);
  var timeout;

  var mountCanvas = function() {
    setMounted(true);
  };

  var renderCanvas = function() {
    const ctx = props.canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var fps = 1;
    var animId;

    var render = function() {
      clearTimeout(timeout);
      tick++;
      props.draw(ctx, tick);

      // timeout = setTimeout(function() {
      //   window.requestAnimationFrame(render);
      // }, 1000/fps);

      var animId = window.requestAnimationFrame(render);
    };

    render();

    return function() {
      window.cancelAnimationFrame(animId);
    };
  };

  useEffect(mountCanvas, []);
  useEffect(renderCanvas, [props.draw]);

  useEffect(function() {
    console.log('in useEffect: ', props.state.entities.length);
  }, [props.state.entities.length])

  return (
    <canvas ref={props.canvasRef} className='canvas' width='1280' height='720' />
  )
};

export default Canvas;