console.log("Really cool code will go here");

let Logger = require('./logger.js');
let Renderer = require('./renderer.js');

class Game {
  constructor(tagname) {
    this.tagname = tagname;
    this.logger = new Logger(tagname);

    this.width = 1000;
    this.height = 800;

    this.renderer = new Renderer(this.width, this.height);
  }

  update() {
    // this.logger.info("update called");
  }

  render() {
    this.renderer.render();
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  start() {
    // Do any first time run here
    document.body.appendChild(this.renderer.view);
    this.player = new Player(new PIXI.Point(250, 80), 50);
    this.level = new Level(50, 1500, 800);
    this.renderer.addPlayer(this.player);
    this.renderer.addLevel(this.level);
    // Should wait for everything, then start loop
    this.loop();
  }

}

class Player {
  constructor(position, size) {
    this.position = position;
    this.width = size, this.height = size;
  }
  update() {}
}

class Level {
  constructor(size, width, height) {
    this.size = size;
    this.width = width;
    this.height = height;

    this.position = new PIXI.Point(150, 150);

    this.cols = Math.floor(this.width/this.size);
    this.rows = Math.floor(this.height/this.size);
  }
}

let game = new Game("RogueTeam");
game.start();

let keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE",
};


window.addEventListener('keydown', function(e) {
  let key = keyConfig[e.keyCode];
  switch(key) {
    case "LEFT":
      game.player.position.x -=5;
      break;
    case "RIGHT":
      game.player.position.x +=5;
      break;
    case "CAMLEFT":
      game.renderer.camera.position.x +=5;
      game.level.position.x -= 1;
      break;
    case "CAMRIGHT":
      game.renderer.camera.position.x -=5;
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
