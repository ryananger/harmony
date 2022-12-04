import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Canvas from './Canvas.jsx';
import Entity from './Entity.js';
import Dev from './Dev.jsx';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    canvas: null,
    ctx: null,
    entities: []
  });

  return (
    <div id="main">
      <Dev state={[state, setState]} />
      <Canvas state={[state, setState]} />
    </div>
  )
}

export default App;

