import React from 'react';
import {useState} from 'react';

import Canvas from './Canvas.jsx';
import Entity from './Entity.js';
import Dev from './DevBar.jsx';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    canvas: null,
    ctx: null,
    entities: []
  });

  return (
    <div id="main">
      <Dev    state={state} setState={setState} />
      <Canvas state={state} setState={setState} />
    </div>
  )
}

export default App;

