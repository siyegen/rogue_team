let Camera = require('./camera.js');

module.exports = class Renderer {
  constructor(viewportWidth, viewportHeight) {
    let center = new PIXI.Point(Math.floor(viewportWidth/2), Math.floor(viewportHeight/2));

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
  update() {
    this.standardCamera.update();
  }
  render() {
    this.renderer.render(this.stage);
    // Test gfx
    if (this.level) {
      this.grid.clear();
      this.grid.lineStyle(2, 0x000000, 1);
      for (let i = this.level.cols; i >= 0; i--) {
        this.grid.moveTo(i*this.level.size, 0);
        this.grid.lineTo(i*this.level.size, this.level.height);
      }
      for (let i = this.level.rows; i >= 0; i--) {
        this.grid.moveTo(0, i*this.level.size);
        this.grid.lineTo(this.level.width, i*this.level.size);
      }
      // for (let i = this.level.rows * this.level.cols; i >= 0; i--) {
      this.grid.beginFill(0x333333, 1);
      for (let [index, tile] of this.level.tiles.entries()) {
        if (tile == 1) {
          let [col, row] = this.level.gridCoord(index);
          this.grid.drawRect(col*this.level.size, row*this.level.size, this.level.size, this.level.size);
        }
      }
      this.grid.endFill();
    }
  }
  addPlayer(player, row, col) {
    let sprite = new PIXI.Sprite.fromImage('./images/test-player.png');
    sprite.anchor.x = 0.5, sprite.anchor.y = 0.5;
    sprite.position = player.position;

    let tile = this.level.tileAt(col, row);
    console.log(col*this.level.size, row*this.level.size);
    if (tile != undefined && tile != 1) {
      player.tileCoord = [col, row];
      player.position.set((col*this.level.size)+this.level.size/2, (row*this.level.size)+this.level.size/2);
    } else {
      throw new RangeError("Player outside of valid range");
    }
    this._world.addChildAt(sprite, 1);
  }
  addLevel(level) {
    let texture = new PIXI.Texture.fromImage('./images/test-sky.png');
    let tilingSprite = new PIXI.extras.TilingSprite(texture, level.width+300, level.height+300);
    tilingSprite.tilePosition = level.position;
    tilingSprite.position = new PIXI.Point(-level.position.x, -level.position.y);
    this._world.addChildAt(tilingSprite, 0);
    this.level = level;
  }
  get view() {
    return this.renderer.view;
  }
  get camera() {
    return this.standardCamera;
  }
  get world() {
    return this._world;
  }
}