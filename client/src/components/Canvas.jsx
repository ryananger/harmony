import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

var Canvas = function(props) {
  const [state, setState] = useState({
    view: 'home'
  });

  const canvasRef = useRef(null);

  useEffect(function() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  }, [])

  return (
    <canvas ref={canvasRef} className='canvas flex v'>

    </canvas>
  )
};

export default Canvas;