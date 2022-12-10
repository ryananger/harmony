import React from 'react';
import {useState} from 'react';
import Entity from './entities/Entity.js';
import Bulbasaur from './entities/Bulbasaur.js';
import Player from './entities/Player.js';

var Dev = function(props) {
  var spawnPlayer = function() {
    if (props.state.player) {
      return;
    }

    var player = Player(0, 0);
    var cam = props.state.camera;
    var entities = props.state.entities;

    cam.following = player;

    props.setState({
      ...props.state,
      camera: cam,
      player: player,
      entities: function() {
        entities.unshift(player);
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
    var entities = props.state.entities;
    var uis = props.state.uis;

    entities.unshift(bulbasaur);
    uis.unshift(bulbasaur.healthBar);

    props.setState({
      ...props.state,
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
    props.setState({
      ...props.state,
      player: null,
      entities: [props.state.camera],
      uis: []
    })
  };

  var followPlayer = function() {
    props.state.entities.map(function(ent) {
      if (ent.isCamera || ent.isPlayer) {
        return;
      }

      if (!ent.following) {
        ent.following = props.state.player;
      } else {
        ent.following = null;
      }
    })
  };

  var toggleUI = function() {
    if (props.state.visibleUI) {
      props.setState({
        ...props.state,
        visibleUI: false
      });
    } else {
      props.setState({
        ...props.state,
        visibleUI: true
      });
    }
  };

  var logState = function() {
    console.log(props.state);
  };

  var logEntities = function() {
    console.log(props.state.entities);
  };

  return (
    <div className="header flex h">
      <div className="devInfo v">
        <div className="devLabel h"><b>View: </b>{`${props.state.view}`}</div>
        <div className="devLabel h"><b># Entities: </b>{`${props.state.entities.length}`}</div>
      </div>
      <div id="devButtons">
        <button id="toggleUI"      onClick={toggleUI}>        Toggle UI.          </button>
        <button id="spawnPlayer"   onClick={spawnPlayer}>     Spawn Player.           </button>
        <button id="spawnEntity"   onClick={spawnBulbasaur}>  Spawn Bulbasaur.        </button>
        <button id="spawn100"      onClick={spawn100}>        Spawn 100 Bulbasauri.   </button>
        <button id="spawn1000"     onClick={spawn1000}>       Spawn 1000 Bulbasauri.  </button>
        <button id="followPlayer"  onClick={followPlayer}>    Follow Player.          </button>
        <button id="logState"      onClick={logState}>        Log state.              </button>
        <button id="logEntities"   onClick={logEntities}>     Log entities.           </button>
        <button id="clearEntities" onClick={clearEntities}>   Clear entities.         </button>
      </div>
    </div>
  )
}

export default Dev;



