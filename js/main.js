console.log("Really cool code will go here");

let Logger = require('./logger.js');
let Renderer = require('./renderer.js');

class Game {
  constructor(tagname) {
    this.tagname = tagname;
    this.logger = new Logger(tagname);

    this.width = 1000;
    this.height = 800;

    // this.level = new Level(50, this.width*2, this.height);
    this.renderer = new Renderer(this.width, this.height);
  }

  update() {
    // this.logger.info("update called");
  }

  render() {
    // render player
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
    this.player = new Player(0x00CCDD, new PIXI.Point(250, 80), 50);
    this.renderer.add(this.player);
    this.loop();
  }

}

let keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE",
};

class Player {
  constructor(color, position, size) {
    this.color = color;
    this.position = position;

    this.width = size, this.height = size;
  }
  update() {}
}

let game = new Game("RogueTeam");
game.start();

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
      game.renderer.camera.position.x -=5;
      break;
    case "CAMRIGHT":
      game.renderer.camera.position.x +=5;
      break;
    case "SPACE":
      console.info("player", game.player.position);
      console.info("container", game.renderer.camera.position);
      console.info("toWorld(player)", game.renderer.camera.toGlobal(game.player.position));
      break;
  }
});
