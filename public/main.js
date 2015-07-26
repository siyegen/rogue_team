(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log("Really cool code will go here");

var Logger = require('./logger.js');

var Game = (function () {
  function Game(tagname) {
    _classCallCheck(this, Game);

    this.tagname = tagname;
    this.logger = new Logger(tagname);

    this.player = new Player(0x00CCDD, { x: 0, y: 0 });

    this.width = 800;
    this.height = 500;

    this.stage = new PIXI.Stage(0xCCECCC, true);
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
    this.camera = new PIXI.DisplayObjectContainer();
    this.camera.position.x = this.width / 2, this.camera.position.y = this.height / 2;
  }

  _createClass(Game, [{
    key: "update",
    value: function update() {
      // this.logger.info("update called");
    }
  }, {
    key: "render",
    value: function render() {
      // render player
      this.player.ctx.clear();
      this.logger.info("Drawing:\n      " + this.player.ctx.x + ", " + this.player.ctx.y + ", " + this.player.width + ", " + this.player.height);
      this.player.ctx.beginFill(this.player.color, 1);
      this.player.ctx.drawRect(this.player.ctx.x, this.player.ctx.y, this.player.width, this.player.height);
      this.player.ctx.endFill();
      this.renderer.render(this.stage);
    }
  }, {
    key: "loop",
    value: function loop() {
      var _this = this;

      this.update();
      this.render();
      requestAnimFrame(function () {
        return _this.loop();
      });
    }
  }, {
    key: "start",
    value: function start() {
      // Do any first time run here
      document.body.appendChild(this.renderer.view);
      this.stage.addChild(this.camera);
      this.camera.addChild(this.player.ctx);
      this.loop();
    }
  }]);

  return Game;
})();

var keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP"
};

var Player = (function () {
  function Player(color, position) {
    _classCallCheck(this, Player);

    this.color = color;
    this.position = position;

    this.width = 10, this.height = 10;
    this.ctx = new PIXI.Graphics();
    this.ctx.position.x = this.position.x;
    this.ctx.position.y = this.position.y;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {}
  }]);

  return Player;
})();

var game = new Game("RogueTeam");
game.start();

window.addEventListener('keydown', function (e) {
  var key = keyConfig[e.keyCode];
  console.log(key);
  switch (key) {
    case "LEFT":
      console.log("left");
      break;
    case "RIGHT":
      console.log("left");
      break;
  }
});

},{"./logger.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1])