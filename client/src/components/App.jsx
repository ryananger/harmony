import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Canvas from './Canvas.jsx';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home'
  });

  return (
    <Canvas></Canvas>
  )
}

export default App;

