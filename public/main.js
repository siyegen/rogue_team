(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

console.log("Really cool code will go here");

var Logger = require('./logger.js');
var Renderer = require('./renderer.js');

var Game = (function () {
  function Game(tagname) {
    _classCallCheck(this, Game);

    this.tagname = tagname;
    this.logger = new Logger(tagname);

    this.width = 1000;
    this.height = 800;

    // this.level = new Level(50, this.width*2, this.height);
    this.renderer = new Renderer(this.width, this.height);
  }

  _createClass(Game, [{
    key: 'update',
    value: function update() {
      // this.logger.info("update called");
    }
  }, {
    key: 'render',
    value: function render() {
      // render player
      this.renderer.render();
    }
  }, {
    key: 'loop',
    value: function loop() {
      var _this = this;

      this.update();
      this.render();
      requestAnimationFrame(function () {
        return _this.loop();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      // Do any first time run here
      document.body.appendChild(this.renderer.view);
      this.player = new Player(0x00CCDD, new PIXI.Point(250, 80), 50);
      this.renderer.add(this.player);
      this.loop();
    }
  }]);

  return Game;
})();

var keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE"
};

var Player = (function () {
  function Player(color, position, size) {
    _classCallCheck(this, Player);

    this.color = color;
    this.position = position;

    this.width = size, this.height = size;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {}
  }]);

  return Player;
})();

var game = new Game("RogueTeam");
game.start();

window.addEventListener('keydown', function (e) {
  var key = keyConfig[e.keyCode];
  switch (key) {
    case "LEFT":
      game.player.position.x -= 5;
      break;
    case "RIGHT":
      game.player.position.x += 5;
      break;
    case "CAMLEFT":
      game.renderer.camera.position.x -= 5;
      break;
    case "CAMRIGHT":
      game.renderer.camera.position.x += 5;
      break;
    case "SPACE":
      console.info("player", game.player.position);
      console.info("container", game.renderer.camera.position);
      console.info("toWorld(player)", game.renderer.camera.toGlobal(game.player.position));
      break;
  }
});

},{"./logger.js":2,"./renderer.js":3}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = (function () {
  function Logger(tagname) {
    _classCallCheck(this, Logger);

    this.tagname = tagname;
  }

  _createClass(Logger, [{
    key: "log",
    value: function log(msg) {
      console.log("[" + this.tagname + "]: " + msg);
    }
  }, {
    key: "warn",
    value: function warn(msg) {
      console.warn("[" + this.tagname + "]: " + msg);
    }
  }, {
    key: "info",
    value: function info(msg) {
      console.info("[" + this.tagname + "]: " + msg);
    }
  }, {
    key: "debug",
    value: function debug(msg) {
      console.debug("[" + this.tagname + "]: " + msg);
    }
  }]);

  return Logger;
})();

module.exports = Logger;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

module.exports = (function () {
  function Renderer(viewportWidth, viewportHeight) {
    _classCallCheck(this, Renderer);

    this.stage = new PIXI.Container();
    // viewport, more or less
    this.standardCamera = new PIXI.Container();
    // this.container.x = viewportWidth/2, this.container.y = viewportHeight/2;
    this.renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight);
    this.stage.addChild(this.standardCamera);

    // Test gfx
    this.grid = new PIXI.Graphics();
    this.grid.position.x = 0, this.grid.position.y = 0;
    this.standardCamera.addChild(this.grid);
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render() {
      this.renderer.render(this.stage);
      // Test gfx
      this.grid.clear();
      this.grid.lineStyle(2, 0x7777FD, 1);
      for (var i = 9; i >= 0; i--) {
        this.grid.moveTo(i * 50, 0);
        this.grid.lineTo(i * 50, 800);
      }
    }
  }, {
    key: 'add',
    value: function add(obj) {
      var sprite = new PIXI.Sprite.fromImage('./images/test-player.png');
      sprite.anchor.x = 0.5, sprite.anchor.y = 0.5;
      sprite.position = obj.position;
      this.standardCamera.addChild(sprite);
    }
  }, {
    key: 'view',
    get: function get() {
      return this.renderer.view;
    }
  }, {
    key: 'camera',
    get: function get() {
      return this.standardCamera;
    }
  }]);

  return Renderer;
})();

},{}]},{},[1])