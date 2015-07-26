console.log("Really cool code will go here");

let Logger = require('./logger.js');

class Game {
  constructor(tagname) {
    this.tagname = tagname;
    this.logger = new Logger(tagname);

    this.player = new Player(0x00CCDD, {x:0, y:0});

    this.width = 800;
    this.height = 500;

    this.stage = new PIXI.Stage(0xCCECCC, true);
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
    this.camera = new PIXI.DisplayObjectContainer();
    this.camera.position.x = this.width / 2, this.camera.position.y = this.height / 2;
  }

  update() {
    // this.logger.info("update called");
  }

  render() {
    // render player
    this.player.ctx.clear();
    this.logger.info(`Drawing:
      ${this.player.ctx.x}, ${this.player.ctx.y}, ${this.player.width}, ${this.player.height}`);
    this.player.ctx.beginFill(this.player.color, 1);
    this.player.ctx.drawRect(
      this.player.ctx.x, this.player.ctx.y,
      this.player.width, this.player.height
    );
    this.player.ctx.endFill();
    this.renderer.render(this.stage);
  }

  loop() {
    this.update();
    this.render();
    requestAnimFrame(() => this.loop());
  }

  start() {
    // Do any first time run here
    document.body.appendChild(this.renderer.view);
    this.stage.addChild(this.camera);
    this.camera.addChild(this.player.ctx);
    this.loop();
  }

}

let keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP"
};

class Player {
  constructor(color, position) {
    this.color = color;
    this.position = position;

    this.width = 10, this.height = 10;
    this.ctx = new PIXI.Graphics();
    this.ctx.position.x = this.position.x;
    this.ctx.position.y = this.position.y;
  }
  update() {}
}

let game = new Game("RogueTeam");
game.start();

window.addEventListener('keydown', function(e) {
  let key = keyConfig[e.keyCode];
  console.log(key);
  switch(key) {
    case "LEFT":
      console.log("left");
      break;
    case "RIGHT":
      console.log("left");
      break;
  }
});
