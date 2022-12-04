import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Canvas from './Canvas.jsx';

var App = function(props) {
  const [state, setState] = useState({
    view: 'home',
    canvas: null,
    ctx: null,
    entities: []
  });

  var logState = function() {
    console.log(state);
  };

  var logEntities = function() {
    console.log(state.entities);
  };

  return (
    <div id="main">
      <div className="header flex h">
        {`View: ${state.view} ........ # of Entities: ${state.entities.length}`}
        <div id="devButtons">
          <button id="logState"    onClick={logState}>   Log state.</button>
          <button id="logEntities" onClick={logEntities}>Log entities.</button>
        </div>
      </div>
      <Canvas state={[state, setState]}></Canvas>
    </div>
  )
}

export default App;

