import React from 'react';
import {useEffect} from 'react';
import axios from 'axios';

var tick = 0;
var renderTimeout;

var Canvas = function({Game}) {
  // draw clears canvas, then renders and updates each entity and tile, according to camera offset.
  var draw = function(ctx, tick) {
    if (!Game.camera) {
      return;
    }

    var camera   = Game.camera;
    var tiles    = Game.tiles;
    var entities = Game.entities;
    var uis      = Game.uis;

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
        ent.update(Game);
      }
    });

    uis.forEach(function(ui) {
      if (ui.nearCamera(camera)) {
        if (Game.visibleUI) {
          ui.render(ctx, camera, tick);
        }
        ui.update();
      }
    });

    ctx.restore();
  };

  // renderCanvas increments tick, calls draw, and renders according to Game.fps.
  var renderCanvas = function() {
    const ctx = document.getElementById('canvas').getContext('2d');

    var animId;
    var render = function() {
      clearTimeout(renderTimeout);
      tick++;
      draw(ctx, tick);

      renderTimeout = setTimeout(function() {
        animId = window.requestAnimationFrame(render);
      }, 1000/Game.fps);
    };

    render();

    return function() {
      window.cancelAnimationFrame(animId);
    };
  };

  useEffect(renderCanvas, [tick]);

  return (
    <canvas id='canvas' className='canvas' width='1280' height='720' />
  )
};

export default Canvas;