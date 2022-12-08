import React from 'react';
import {useState, useEffect} from 'react';
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

    cam.following = player;

    props.setState({
      ...props.state,
      camera: cam,
      player: player,
      entities: function() {
        props.state.entities.unshift(player);
        return props.state.entities;
      }()
    })
  };

  var spawnBulbasaur = function() {
    var x = -640 + Math.floor(Math.random() * 1280);
    var y = -360 + Math.floor(Math.random() * 720);

    var bulbasaur = Bulbasaur(x, y);

    props.setState({
      ...props.state,
      entities: function() {
        props.state.entities.unshift(bulbasaur);
        return props.state.entities;
      }()
    })
  };

  var spawn100 = function() {
    for (var i = 0; i < 100; i++) {
      spawnBulbasaur();
    }
  }

  var clearEntities = function() {
    props.setState({
      ...props.state,
      player: null,
      entities: [props.state.camera]
    })
  };

  var logState = function() {
    console.log(props.state);
  };

  var logEntities = function() {
    console.log(props.state.entities);
  };

  var playerCheck = function() {
    if (props.state.player && props.state.camera) {
      return (
        <div>
          <div className="devLabel h"><b>Player position: </b>{`(${props.state.player.x}, ${props.state.player.y})`}</div>
          <div className="devLabel h"><b>Camera position: </b>{`(${props.state.camera.x}, ${props.state.camera.y})`}</div>
        </div>
      )
    }
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

  return (
    <div className="header flex h">
      <div className="devInfo v">
        <div className="devLabel h"><b>View: </b>{`${props.state.view}`}</div>
        <div className="devLabel h"><b># Entities: </b>{`${props.state.entities.length}`}</div>
        {playerCheck()}
      </div>
      <div id="devButtons">
        <button id="spawnPlayer"   onClick={spawnPlayer}>     Spawn Player.           </button>
        <button id="spawnEntity"   onClick={spawnBulbasaur}>  Spawn Bulbasaur.        </button>
        <button id="spawn100"      onClick={spawn100}>        Spawn 100 Bulbasauri.   </button>
        <button id="followPlayer"  onClick={followPlayer}>    Follow Player.          </button>
        <button id="logState"      onClick={logState}>        Log state.              </button>
        <button id="logEntities"   onClick={logEntities}>     Log entities.           </button>
        <button id="clearEntities" onClick={clearEntities}>   Clear entities.         </button>
      </div>
    </div>
  )
}

export default Dev;



