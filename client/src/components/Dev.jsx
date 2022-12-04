import React from 'react';
import {useState, useEffect} from 'react';

var Dev = function(props) {
  const [state, setState] = props.state;

  var spawnEntity = function() {
    var x = Math.floor(Math.random() * state.canvas.width);
    var y = Math.floor(Math.random() * state.canvas.height);

    var entity = Entity(x, y);
    var img = '../../public/bulbasprite.png';
    entity.methods.newImage(img, true, 36);

    setState({
      ...state,
      entities: function() {
        state.entities.unshift(entity);
        return state.entities;
      }()
    })
  };

  var logState = function() {
    console.log(state);
  };

  var logEntities = function() {
    console.log(state.entities);
  };

  return (
    <div className="header flex h">
      {`View: ${state.view} ........ # of Entities: ${state.entities.length}`}
      {/* <img src='../../public/bulbasprite.png'/> */}
      <div id="devButtons">
        <button id="spawnEntity" onClick={spawnEntity}>Spawn entity.</button>
        <button id="logState"    onClick={logState}>   Log state.</button>
        <button id="logEntities" onClick={logEntities}>Log entities.</button>
      </div>
    </div>
  )
}

export default Dev;



