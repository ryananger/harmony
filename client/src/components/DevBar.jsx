import React from 'react';
import {useState, useEffect} from 'react';
import Entity from './Entity.js';

var Dev = function(props) {
  var spawnEntity = function() {
    var x = Math.floor(Math.random() * 1280);
    var y = Math.floor(Math.random() * 200);

    var bulbasaur = Entity(x, y);
    var src = '../../public/bulbasprite.png';
    var sprite = bulbasaur.newImage(src, true, 72);

    sprite.animations = {
      walkDown:  {start: 0},
      walkLeft:  {start: 3},
      walkUp:    {start: 6},
      walkRight: {start: 9}
    };

    sprite.sheetLength = 3;
    sprite.frameDuration = 8;
    sprite.currentAnimation = 'walkDown';

    bulbasaur.actions.walk = function() {
      bulbasaur.y += 10;
    };

    bulbasaur.update = function() {
      bulbasaur.actions.walk();
    }

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
        <button id="spawnEntity"   onClick={spawnEntity}>  Spawn entity.      </button>
        <button id="logState"      onClick={logState}>     Log state.         </button>
        <button id="logEntities"   onClick={logEntities}>  Log entities.      </button>
        <button id="clearEntities" onClick={clearEntities}>Clear entities.    </button>
      </div>
    </div>
  )
}

export default Dev;



