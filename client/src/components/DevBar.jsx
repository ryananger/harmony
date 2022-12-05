import React from 'react';
import {useState, useEffect} from 'react';
import Entity from './Entity.js';

var Dev = function(props) {
  var spawnEntity = function() {
    var x = Math.floor(Math.random() * props.state.canvas.width);
    var y = Math.floor(Math.random() * props.state.canvas.height);

    var entity = Entity(x, y);
    var img = '../../public/bulbasprite.png';
    entity.methods.newImage(img, true, 72);

    props.setState({
      ...props.state,
      entities: function() {
        props.state.entities.unshift(entity);
        return props.state.entities;
      }()
    })
  };

  var clearEntities = function() {
    props.state.ctx.clearRect(0, 0, 1280, 720);
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



