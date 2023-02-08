import React from 'react';

import Entity from './Game/Entity.js';

var Dev = function({Game}) {

  var clearEntities = function() {
    Game.player = null;
    Game.entities = [Game.camera];
    Game.uis = [];
  };

  var toggleUI = function() {
    Game.visibleUI = !Game.visibleUI;
  };

  var logState = function() {
    console.log(Game);
  };

  var logEntities = function() {
    console.log(Game.entities);
  };

  var toggleBorders = function() {
    Game.showBorders = !Game.showBorders;
  };

  var toggleBoxes = function() {
    Game.showBoxes = !Game.showBoxes;
  }

  var playerCoordinates = function() {
    if (!Game.player) {
      return 'No player';
    } else {
      return `(${Game.player.x}, ${Game.player.y})`;
    }
  };

  return (
    <div className="devBar flex v float">
      <div className="devInfo v">
        <div className="devLabel h"><b>View:&nbsp;</b>        {`${Game.view}`}</div>
        <div className="devLabel h"><b># Entities:&nbsp;</b>  {`${Game.entities.length}`}</div>
        <div className="devLabel h"><b>Player:&nbsp;</b>      {playerCoordinates()}</div>
      </div>
      <div className="devButtons v">
        <button id="toggleUI"      onClick={toggleUI}>        Toggle UI.              </button>
        <button id="logState"      onClick={logState}>        Log state.              </button>
        <button id="showBorders"   onClick={toggleBorders}>   Borders.                </button>
        <button id="showBoxes"     onClick={toggleBoxes}>     Boxes.                  </button>
        <button id="logEntities"   onClick={logEntities}>     Log entities.           </button>
        <button id="clearEntities" onClick={clearEntities}>   Clear entities.         </button>
      </div>
    </div>
  )
}

export default Dev;



