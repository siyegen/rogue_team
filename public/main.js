(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

module.exports = (function (_PIXI$Container) {
  _inherits(Camera, _PIXI$Container);

  function Camera(position, world) {
    _classCallCheck(this, Camera);

    _get(Object.getPrototypeOf(Camera.prototype), "constructor", this).call(this);
    this.pivot.x = position.x, this.pivot.y = position.y;
    this.position.x = position.x, this.position.y = position.y;
    this.scale = new PIXI.Point(1, 1);
    this.isZoomed = false;
    this.world = world;
    this.addChild(this.world);
    this.target = null;
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
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Camera;
})(PIXI.Container);

},{}],2:[function(require,module,exports){
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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
      if (this.player.direction.x != 0) {
        var _player$tileCoord = _slicedToArray(this.player.tileCoord, 2);

        var _col = _player$tileCoord[0];
        var _row = _player$tileCoord[1];

        var _moveTo = this.level.tileAt(_col + this.player.direction.x, _row);
        if (_moveTo != undefined && _moveTo != 1) {
          this.player.tileCoord = [_col + this.player.direction.x, _row];
        }
      }
      if (this.player.direction.y != 0) {
        var _player$tileCoord2 = _slicedToArray(this.player.tileCoord, 2);

        var _col2 = _player$tileCoord2[0];
        var _row2 = _player$tileCoord2[1];

        var _moveTo2 = this.level.tileAt(_col2, _row2 + this.player.direction.y);
        if (_moveTo2 != undefined && _moveTo2 != 1) {
          this.player.tileCoord = [_col2, _row2 + this.player.direction.y];
        }
      }
      this.player.direction.x = 0;
      this.player.direction.y = 0;

      var _player$tileCoord3 = _slicedToArray(this.player.tileCoord, 2);

      var col = _player$tileCoord3[0];
      var row = _player$tileCoord3[1];

      this.player.position.set(col * this.level.size + this.level.size / 2, row * this.level.size + this.level.size / 2);
      this.renderer.update();
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
      this.level = new Level(50, 1500, 800);
      this.player = new Player(new PIXI.Point(250, 80), 50);
      this.renderer.addLevel(this.level);
      this.renderer.addPlayer(this.player, 4, 2);
      // Should wait for everything, then start loop
      this.loop();
    }
  }]);

  return Game;
})();

var Player = function Player(position, size) {
  _classCallCheck(this, Player);

  this.position = position;
  this.width = size, this.height = size;
  this.direction = { x: 0, y: 0 };
  this.tileCoord = [0, 0];
};

var Level = (function () {
  function Level(size, width, height) {
    _classCallCheck(this, Level);

    this.size = size;
    this.width = width;
    this.height = height;
    this.tiles = [];

    this.position = new PIXI.Point(150, 150);

    this.cols = Math.floor(this.width / this.size);
    this.rows = Math.floor(this.height / this.size);
    this.generate();
  }

  _createClass(Level, [{
    key: 'generate',
    value: function generate() {
      // All edges should be walls
      var number = this.cols * this.rows;
      for (var i = 0; i < number; i++) {
        if (Math.trunc(i / this.cols) == 0 || Math.trunc(i / this.cols) == this.rows - 1) {
          this.tiles.push(1);
        } else if (i % this.cols == 0 || i % this.cols == this.cols - 1) {
          this.tiles.push(1);
        } else {
          this.tiles.push(0);
        }
      };
      // this.tiles[0] = 1, this.tiles[15] = 1,
      // this.tiles[4] = 1, this.tiles[this.cols] = 1;
      console.log("moo gen");
    }
  }, {
    key: 'gridCoord',
    value: function gridCoord(index) {
      return [index % this.cols, Math.trunc(index / this.cols)];
    }
  }, {
    key: 'tileAt',
    value: function tileAt(col, row) {
      return this.tiles[row * this.cols + col];
    }
  }]);

  return Level;
})();

var game = new Game("RogueTeam");
game.start();

var keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE",
  90: "ZOOM",
  70: "FOLLOW"
};

window.addEventListener('click', function (e) {
  var point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point);
  console.log("click world position", game.renderer.world.toLocal(point));
  console.info("player screen position", game.renderer.world.toGlobal(game.player.position));
});

window.addEventListener('keydown', function (e) {
  var key = keyConfig[e.keyCode];
  switch (key) {
    case "FOLLOW":
      break;
    case "UP":
      game.player.direction.y = -1;
      break;
    case "DOWN":
      game.player.direction.y = 1;
      break;
    case "LEFT":
      game.player.direction.x = -1;
      break;
    case "RIGHT":
      game.player.direction.x = 1;
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
      console.info("player world position", game.player.position);
      console.info("level", game.level.position);
      console.info("camera", game.renderer.camera.position, game.renderer.camera.width, game.renderer.camera.height);
      console.info("player screen position", game.renderer.world.toGlobal(game.player.position));
      break;
    case "ZOOM":
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

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Camera = require('./camera.js');

module.exports = (function () {
  function Renderer(viewportWidth, viewportHeight) {
    _classCallCheck(this, Renderer);

    var center = new PIXI.Point(Math.floor(viewportWidth / 2), Math.floor(viewportHeight / 2));

    this.stage = new PIXI.Container();
    this._world = new PIXI.Container();
    this.standardCamera = new Camera(center, this._world);
    this.renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight);
    this.stage.addChild(this.standardCamera);

    // Test gfx
    this.grid = new PIXI.Graphics();
    this.grid.position.x = 0, this.grid.position.y = 0;
    this._world.addChild(this.grid);
    console.log(this.standardCamera);
  }

  _createClass(Renderer, [{
    key: 'update',
    value: function update() {
      this.standardCamera.update();
    }
  }, {
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
        // for (let i = this.level.rows * this.level.cols; i >= 0; i--) {
        this.grid.beginFill(0x333333, 1);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.level.tiles.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var index = _step$value[0];
            var tile = _step$value[1];

            if (tile == 1) {
              var _level$gridCoord = this.level.gridCoord(index);

              var _level$gridCoord2 = _slicedToArray(_level$gridCoord, 2);

              var col = _level$gridCoord2[0];
              var row = _level$gridCoord2[1];

              this.grid.drawRect(col * this.level.size, row * this.level.size, this.level.size, this.level.size);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.grid.endFill();
      }
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(player, row, col) {
      var sprite = new PIXI.Sprite.fromImage('./images/test-player.png');
      sprite.anchor.x = 0.5, sprite.anchor.y = 0.5;
      sprite.position = player.position;

      var tile = this.level.tileAt(col, row);
      console.log(col * this.level.size, row * this.level.size);
      if (tile != undefined && tile != 1) {
        player.tileCoord = [col, row];
        player.position.set(col * this.level.size + this.level.size / 2, row * this.level.size + this.level.size / 2);
      } else {
        throw new RangeError("Player outside of valid range");
      }
      this._world.addChildAt(sprite, 1);
    }
  }, {
    key: 'addLevel',
    value: function addLevel(level) {
      var texture = new PIXI.Texture.fromImage('./images/test-sky.png');
      var tilingSprite = new PIXI.extras.TilingSprite(texture, level.width + 300, level.height + 300);
      tilingSprite.tilePosition = level.position;
      tilingSprite.position = new PIXI.Point(-level.position.x, -level.position.y);
      this._world.addChildAt(tilingSprite, 0);
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
  }, {
    key: 'world',
    get: function get() {
      return this._world;
    }
  }]);

  return Renderer;
})();

},{"./camera.js":1}]},{},[2])