import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Entity from './Entity.js';

var Canvas = function(props) {
  const [state, setState] = props.state;

  const canvasRef = useRef(null);

  useEffect(function() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    var entity = Entity('Jeff');

    setState({
      ...state,
      canvas: canvas,
      ctx: ctx,
      entities: function() {
        state.entities.unshift(entity);
        return state.entities;
      }()
    })
  }, [])

  return (
    <canvas ref={canvasRef} className='canvas flex v'>

    </canvas>
  )
};

export default Canvas;