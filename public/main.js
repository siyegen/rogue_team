(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

module.exports = (function (_PIXI$Container) {
  _inherits(Camera, _PIXI$Container);

  function Camera(position, width, height) {
    _classCallCheck(this, Camera);

    _get(Object.getPrototypeOf(Camera.prototype), "constructor", this).call(this);
    this.pivot.x = position.x, this.pivot.y = position.y;
    this.position.x = position.x, this.position.y = position.y;
    this.width = width, this.height = height;
    this.scale = new PIXI.Point(1, 1);
    this.isZoomed = false;
  }

  _createClass(Camera, [{
    key: "zoom",
    value: function zoom() {
      if (this.isZoomed) {
        this.scale.set(1);
        this.isZoomed = false;
      } else {
        this.scale.set(0.5);
        this.isZoomed = true;
      }
    }
  }]);

  return Camera;
})(PIXI.Container);

},{}],2:[function(require,module,exports){
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
      this.player = new Player(new PIXI.Point(250, 80), 50);
      this.level = new Level(50, 1500, 800);
      this.renderer.addPlayer(this.player);
      this.renderer.addLevel(this.level);
      // Should wait for everything, then start loop
      this.loop();
    }
  }]);

  return Game;
})();

var Player = (function () {
  function Player(position, size) {
    _classCallCheck(this, Player);

    this.position = position;
    this.width = size, this.height = size;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {}
  }]);

  return Player;
})();

var Level = function Level(size, width, height) {
  _classCallCheck(this, Level);

  this.size = size;
  this.width = width;
  this.height = height;

  this.position = new PIXI.Point(150, 150);

  this.cols = Math.floor(this.width / this.size);
  this.rows = Math.floor(this.height / this.size);
};

var game = new Game("RogueTeam");
game.start();

var keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE"
};

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
      game.renderer.camera.position.x += 5;
      game.level.position.x -= 1;
      break;
    case "CAMRIGHT":
      game.renderer.camera.position.x -= 5;
      game.level.position.x += 1;
      break;
    case "SPACE":
      console.info("player", game.player.position);
      console.info("level", game.level);
      console.info("container", game.renderer.camera);
      console.info("toWorld(player)", game.renderer.camera.toGlobal(game.player.position));
      game.renderer.camera.zoom();
      break;
  }
});

},{"./logger.js":3,"./renderer.js":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Camera = require('./camera.js');

module.exports = (function () {
  function Renderer(viewportWidth, viewportHeight) {
    _classCallCheck(this, Renderer);

    var center = new PIXI.Point(Math.floor(viewportWidth / 2), Math.floor(viewportHeight / 2));

    this.stage = new PIXI.Container();
    this.standardCamera = new Camera(center, viewportWidth, viewportHeight);
    // this.standardCamera = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight);
    this.stage.addChild(this.standardCamera);

    // Test gfx
    this.grid = new PIXI.Graphics();
    this.grid.position.x = 0, this.grid.position.y = 0;
    this.standardCamera.addChild(this.grid);
    console.log(this.standardCamera);
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render() {
      this.renderer.render(this.stage);
      // Test gfx
      if (this.level) {
        this.grid.clear();
        this.grid.lineStyle(2, 0x000000, 1);
        for (var i = this.level.cols; i >= 0; i--) {
          this.grid.moveTo(i * this.level.size, 0);
          this.grid.lineTo(i * this.level.size, this.level.height);
        }
        for (var i = this.level.rows; i >= 0; i--) {
          this.grid.moveTo(0, i * this.level.size);
          this.grid.lineTo(this.level.width, i * this.level.size);
        }
      }
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(player) {
      var sprite = new PIXI.Sprite.fromImage('./images/test-player.png');
      sprite.anchor.x = 0.5, sprite.anchor.y = 0.5;
      sprite.position = player.position;
      this.standardCamera.addChildAt(sprite, 1);
    }
  }, {
    key: 'addLevel',
    value: function addLevel(level) {
      var texture = new PIXI.Texture.fromImage('./images/test-sky.png');
      var tilingSprite = new PIXI.extras.TilingSprite(texture, level.width + 300, level.height + 300);
      // tilingSprite.anchor.x = 0.5, tilingSprite.anchor.y = 0.5;
      tilingSprite.tilePosition = level.position;
      tilingSprite.position = new PIXI.Point(-150, -150);
      this.standardCamera.addChildAt(tilingSprite, 0);
      this.level = level;
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

},{"./camera.js":1}]},{},[2])