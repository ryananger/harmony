import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Entity from './entities/Entity.js';

var tick = 0;
var timeout;

var Canvas = function(props) {
  // draw clears canvas, then renders and updates each entity and tile, according to camera offset.
  var draw = function(ctx, tick) {
    if (!props.state.camera) {
      return;
    }

    var camera   = props.state.camera;
    var tiles    = props.state.tiles;
    var entities = props.state.entities;
    var uis      = props.state.uis;

    var offX = camera.x - (ctx.canvas.width/2);
    var offY = camera.y - (ctx.canvas.height/2);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(-offX, -offY);

    tiles.forEach(function(tile) {
      if (tile.nearCamera(camera)) {
        tile.render(ctx, camera);
        tile.update();
      }
    });

    entities.forEach(function(ent) {
      if (ent.nearCamera(camera)) {
        ent.render(ctx, camera, tick);
        ent.update(props.state, props.setState);
      }
    });

    uis.forEach(function(ui) {
      if (ui.nearCamera(camera)) {
        if (props.state.visibleUI) {
          ui.render(ctx, camera, tick);
        }
        ui.update();
      }
    });

    ctx.restore();
  };

  // renderCanvas increments tick, calls draw, and renders according to state.fps.
  var renderCanvas = function() {
    const ctx = props.canvasRef.current.getContext('2d');

    var animId;
    var render = function() {
      clearTimeout(timeout);
      tick++;
      draw(ctx, tick);

      timeout = setTimeout(function() {
        animId = window.requestAnimationFrame(render);
      }, 1000/props.state.fps);
    };

    render();

    return function() {
      window.cancelAnimationFrame(animId);
    };
  };

  useEffect(renderCanvas, [draw]);

  return (
    <canvas ref={props.canvasRef} className='canvas' width='1280' height='720' />
  )
};

export default Canvas;