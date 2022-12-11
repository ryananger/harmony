import React from 'react';
import {useEffect, useState} from 'react';

import Dev from './DevBar.jsx';
import UI from './UI.jsx';
import Game from './Game/Game.js';

var App = function() {
  const [updates, updateReact] = useState(0);
  const updateInterval = 1000;

  const reactLoop = function() {
    setTimeout(function() {
      updateReact(updates + 1);
    }, updateInterval);
  };

  useEffect(reactLoop, [updates]);
  useEffect(Game.gameLoop, []);

  return (
    <div id="main">
      <Dev Game={Game} />
      <UI  Game={Game} />
      <canvas id='canvas' className='canvas' width='1280' height='720' />
    </div>
  )
}

export default App;

