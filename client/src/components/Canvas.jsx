import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Entity from './Entity.js';

var tick = 0;
var timeout;

var Canvas = function(props) {
  var renderCanvas = function() {
    const ctx = props.canvasRef.current.getContext('2d');

    var animId;
    var render = function() {
      clearTimeout(timeout);
      tick++;
      props.draw(ctx, tick);

      timeout = setTimeout(function() {
        animId = window.requestAnimationFrame(render);
      }, 1000/props.state.fps);
    };

    render();

    return function() {
      window.cancelAnimationFrame(animId);
    };
  };

  useEffect(renderCanvas, [props.draw]);

  return (
    <canvas ref={props.canvasRef} className='canvas' width='1280' height='720' />
  )
};

export default Canvas;