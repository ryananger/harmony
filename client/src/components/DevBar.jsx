import React from 'react';
import {useState, useEffect} from 'react';
import Entity from './Entity.js';
import Bulbasaur from './Bulbasaur.js';
import Player from './Player.js';

var Dev = function(props) {
  var spawnPlayer = function() {
    if (props.state.player) {
      return;
    }

    var player = Player(640, 360);

    props.setState({
      ...props.state,
      player: player,
      entities: function() {
        props.state.entities.unshift(player);
        return props.state.entities;
      }()
    })
  };

  var spawnBulbasaur = function() {
    var x = Math.floor(Math.random() * 1280);
    var y = Math.floor(Math.random() * 200);

    var bulbasaur = Bulbasaur(x, y);

    props.setState({
      ...props.state,
      entities: function() {
        props.state.entities.unshift(bulbasaur);
        return props.state.entities;
      }()
    })
  };

  var clearEntities = function() {
    props.setState({
      ...props.state,
      player: null,
      entities: []
    })
  };

  var logState = function() {
    console.log(props.state);
  };

  var logEntities = function() {
    console.log(props.state.entities);
  };

  return (
    <div className="header flex h">
      {`View: ${props.state.view} ........ # of Entities: ${props.state.entities.length}`}
      <div id="devButtons">
        <button id="spawnPlayer"   onClick={spawnPlayer}>     Spawn Player.      </button>
        <button id="spawnEntity"   onClick={spawnBulbasaur}>  Spawn Bulbasaur.   </button>
        <button id="logState"      onClick={logState}>        Log state.         </button>
        <button id="logEntities"   onClick={logEntities}>     Log entities.      </button>
        <button id="clearEntities" onClick={clearEntities}>   Clear entities.    </button>
      </div>
    </div>
  )
}

export default Dev;



