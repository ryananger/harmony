import React from 'react';
import {useEffect, useState} from 'react';

import Game from './Game/Game.js';
import Dev from './DevBar.jsx';
import UI from './UI.jsx';

var App = function() {
  const [updates, updateReact] = useState(0);
  const updateInterval = 100;

  const height = Math.floor(window.innerHeight);
  const width = Math.floor(window.innerWidth);

  const reactLoop = function() {
    setTimeout(function() {
      updateReact(updates + 1);
    }, updateInterval);
  };

  useEffect(reactLoop, [updates]);
  useEffect(Game.gameLoop, []);

  return (
    <div className='play'>
      <Dev Game={Game} />
      <UI  Game={Game} />
      <canvas id='canvas' style={{width: width, height: height}} className='canvas float' width={width} height={height} />
    </div>
  )
}

export default App;

