import React from 'react';
import {useState} from 'react';
import Entity from './entities/Entity.js';
import Bulbasaur from './entities/Bulbasaur.js';
import Player from './entities/Player.js';

var Dev = function({state, setState}) {
  var spawnPlayer = function() {
    if (state.player) {
      return;
    }

    var p = Player(0, 0);
    var cam = state.camera;
    var entities = state.entities;

    cam.following = p;

    setState({
      ...state,
      camera: cam,
      player: p,
      entities: function() {
        entities.unshift(p);
        return entities;
      }()
    })
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
    var entities = state.entities;
    var uis = state.uis;

    entities.unshift(bulbasaur);
    uis.unshift(bulbasaur.healthBar);

    setState({
      ...state,
      entities: entities,
      uis: uis
    })
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
    setState({
      ...state,
      player: null,
      entities: [state.camera],
      uis: []
    })
  };

  var followPlayer = function() {
    state.entities.map(function(ent) {
      if (ent.isCamera || ent.isPlayer) {
        return;
      }

      if (!ent.following) {
        ent.following = state.player;
      } else {
        ent.following = null;
      }
    })
  };

  var toggleUI = function() {
    if (state.visibleUI) {
      setState({
        ...state,
        visibleUI: false
      });
    } else {
      setState({
        ...state,
        visibleUI: true
      });
    }
  };

  var logState = function() {
    console.table(state.player.x, state.player.y);
  };

  var logEntities = function() {
    console.log(state.entities);
  };

  var playerCoordinates = function() {
    if (state.player) {
      var x = state.player.x;
      var y = state.player.y;

      return `(${x}, ${y})`;
    } else {
      return 'No Player.'
    }
  };

  return (
    <div className="header flex v">
      {playerCoordinates()}
      <div className="devInfo h">
        <div className="devLabel h"><b>View:&nbsp;</b>        {`${state.view}`}</div>
        <div className="devLabel h"><b># Entities:&nbsp;</b>  {`${state.entities.length}`}</div>
      </div>
      <div id="devButtons">
        <button id="toggleUI"      onClick={toggleUI}>        UI.                     </button>
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



