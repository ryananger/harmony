import React from 'react';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

var tick = 0;
var updates = 0;
var renderTimeout;
var updateTimeout;

var Canvas = function({state, setState, canvasRef}) {
  // draw clears canvas, then renders and updates each entity and tile, according to camera offset.
  var draw = function(ctx, tick) {
    if (!state.camera) {
      return;
    }

    var camera   = state.camera;
    var tiles    = state.tiles;
    var entities = state.entities;
    var uis      = state.uis;

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
        ent.update(state, setState);
      }
    });

    uis.forEach(function(ui) {
      if (ui.nearCamera(camera)) {
        if (state.visibleUI) {
          ui.render(ctx, camera, tick);
        }
        ui.update();
      }
    });

    ctx.restore();
  };

  // renderCanvas increments tick, calls draw, and renders according to state.fps.
  var renderCanvas = function() {
    const ctx = canvasRef.current.getContext('2d');

    var animId;
    var render = function() {
      clearTimeout(renderTimeout);
      tick++;
      draw(ctx, tick);

      renderTimeout = setTimeout(function() {
        animId = window.requestAnimationFrame(render);
      }, 1000/state.fps);
    };

    render();

    return function() {
      window.cancelAnimationFrame(animId);
    };
  };

  useEffect(renderCanvas, [tick]);

  return (
    <canvas ref={canvasRef} className='canvas' width='1280' height='720' />
  )
};

export default Canvas;