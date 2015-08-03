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
    if (this.player.direction.x != 0) {
      let [col, row] = this.player.tileCoord;
      let moveTo = this.level.tileAt(col+this.player.direction.x, row);
      if (moveTo != undefined && moveTo != 1) {
        this.player.tileCoord = [col+this.player.direction.x, row];
      }
    }
    if (this.player.direction.y != 0) {
      let [col, row] = this.player.tileCoord;
      let moveTo = this.level.tileAt(col, row+this.player.direction.y);
      if (moveTo != undefined && moveTo != 1) {
        this.player.tileCoord = [col, row+this.player.direction.y];
      }
    }
    this.player.direction.x = 0;
    this.player.direction.y = 0;
    let [col, row] = this.player.tileCoord;
    this.player.position.set((col*this.level.size)+this.level.size/2, (row*this.level.size)+this.level.size/2);
    this.renderer.update();
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
    this.level = new Level(50, 1500, 800);
    this.player = new Player(new PIXI.Point(250, 80), 50);
    this.renderer.addLevel(this.level);
    this.renderer.addPlayer(this.player, 4, 2);
    // Should wait for everything, then start loop
    this.loop();
  }

}

class Player {
  constructor(position, size) {
    this.position = position;
    this.width = size, this.height = size;
    this.direction = {x:0, y:0};
    this.tileCoord = [0,0];
  }
}

class Level {
  constructor(size, width, height) {
    this.size = size;
    this.width = width;
    this.height = height;
    this.tiles = [];

    this.position = new PIXI.Point(150, 150);

    this.cols = Math.floor(this.width/this.size);
    this.rows = Math.floor(this.height/this.size);
    this.generate();
  }
  generate() {
    // All edges should be walls
    let number = this.cols * this.rows;
    for (var i = 0; i < number; i++) {
      if (Math.trunc(i/this.cols) == 0 || Math.trunc(i/this.cols) == this.rows-1) {
        this.tiles.push(1);
      } else if (i%this.cols == 0 || i%this.cols == this.cols-1) {
        this.tiles.push(1);
      } else {
        this.tiles.push(0);
      }
    };
    // this.tiles[0] = 1, this.tiles[15] = 1,
    // this.tiles[4] = 1, this.tiles[this.cols] = 1;
    console.log("moo gen");
  }
  gridCoord(index) {
    return [index%this.cols, Math.trunc(index/this.cols)];
  }
  tileAt(col, row) {
    return this.tiles[row*this.cols + col]
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
  90: "ZOOM",
  70: "FOLLOW",
};

window.addEventListener('click', function(e) {
  let point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point)
  console.log("click world position", game.renderer.world.toLocal(point));
  console.info("player screen position", game.renderer.world.toGlobal(game.player.position));
});

window.addEventListener('keydown', function(e) {
  let key = keyConfig[e.keyCode];
  switch(key) {
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
      game.renderer.camera.position.x +=5;
      game.level.position.x -= 1;
      break;
    case "CAMRIGHT":
      game.renderer.camera.position.x -=5;
      game.level.position.x += 1;
      break;
    case "SPACE":
      console.info("player world position", game.player.position);
      console.info("level", game.level.position);
      console.info("camera",
        game.renderer.camera.position,
        game.renderer.camera.width,
        game.renderer.camera.height);
      console.info("player screen position", game.renderer.world.toGlobal(game.player.position));
      break;
    case "ZOOM":
      game.renderer.camera.zoom();
      break;
  }
});
