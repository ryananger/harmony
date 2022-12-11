import React from 'react';
import Entity from './Game/Entity.js';
import Bulbasaur from './Game/Bulbasaur.js';
import Player from './Game/Player.js';

var Dev = function({Game}) {
  var spawnPlayer = function() {
    if (Game.player) {
      return;
    }

    var p = Player(0, 0);
    var cam = Game.camera;

    Game.player = p;
    Game.entities.unshift(p);
    cam.following = p;
  };

  var spawnBulbasaur = function(many) {
    var w = 1280;
    var h = 720;

    if (many === true) {
      w *= 10;
      h *= 10;
    }

    var x = -w/2 + Math.floor(Math.random() * w);
    var y = -h/2 + Math.floor(Math.random() * h);

    var bulbasaur = Bulbasaur(x, y);
    var entities = Game.entities;
    var uis = Game.uis;

    entities.unshift(bulbasaur);
    uis.unshift(bulbasaur.healthBar);
  };

  var spawn100 = function() {
    for (var i = 0; i < 100; i++) {
      spawnBulbasaur();
    }
  };

  var spawn1000 = function() {
    for (var i = 0; i < 1000; i++) {
      spawnBulbasaur(true);
    }
  };

  var clearEntities = function() {
    Game.player = null;
    Game.entities = [Game.camera];
    Game.uis = [];
  };

  var followPlayer = function() {
    Game.entities.map(function(ent) {
      if (ent.isCamera || ent.isPlayer) {
        return;
      }

      if (!ent.following) {
        ent.following = Game.player;
      } else {
        ent.following = null;
      }
    })
  };

  var toggleUI = function() {
    if (Game.visibleUI) {
      Game.visibleUI = false;
    } else {
      Game.visibleUI = true;
    }
  };

  var logState = function() {
    console.log(Game);
  };

  var logEntities = function() {
    console.log(Game.entities);
  };

  var playerCoordinates = function() {
    if (!Game.player) {
      return 'No player';
    } else {
      return `(${Game.player.x}, ${Game.player.y})`;
    }
  };

  return (
    <div className="devBar flex v">
      <div className="devInfo h">
        <div className="devLabel h"><b>View:&nbsp;</b>        {`${Game.view}`}</div>
        <div className="devLabel h"><b># Entities:&nbsp;</b>  {`${Game.entities.length}`}</div>
        <div className="devLabel h"><b>Player:&nbsp;</b>      {playerCoordinates()}</div>
      </div>
      <div id="devButtons">
        <button id="toggleUI"      onClick={toggleUI}>        Toggle UI.              </button>
        <button id="spawnPlayer"   onClick={spawnPlayer}>     Player.                 </button>
        <button id="spawnEntity"   onClick={spawnBulbasaur}>  Bulbasaur.              </button>
        <button id="spawn100"      onClick={spawn100}>        Spawn 100.              </button>
        <button id="spawn1000"     onClick={spawn1000}>       Spawn 1000.             </button>
        <button id="followPlayer"  onClick={followPlayer}>    Follow.                 </button>
        <button id="logState"      onClick={logState}>        Log state.              </button>
        <button id="logEntities"   onClick={logEntities}>     Log entities.           </button>
        <button id="clearEntities" onClick={clearEntities}>   Clear entities.         </button>
      </div>
    </div>
  )
}

export default Dev;



