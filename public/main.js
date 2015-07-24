(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

console.log("Really cool code will go here");

var Main = (function () {
  function Main(logTag, name) {
    _classCallCheck(this, Main);

    this.logTag = logTag;
    this.name = name;
  }

  _createClass(Main, [{
    key: 'yell',
    value: function yell(who) {
      console.log('Yoooo, ' + name + ' is angry at ' + who);
    }
  }, {
    key: 'name',
    get: function get() {
      return name;
    },
    set: function set(other) {
      name = other;
    }
  }]);

  return Main;
})();

var m = new Main('fish', 'Finn');

console.log(m.name);
m.yell("Jake");
m.name = "Super Finn";
m.yell("Less than Jake");

},{}]},{},[1])