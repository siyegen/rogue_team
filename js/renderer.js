let Camera = require('./camera.js');

module.exports = class Renderer {
  constructor(viewportWidth, viewportHeight) {
    let center = new PIXI.Point(Math.floor(viewportWidth/2), Math.floor(viewportHeight/2));

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
    }
  }
  addPlayer(player) {
    let sprite = new PIXI.Sprite.fromImage('./images/test-player.png');
    sprite.anchor.x = 0.5, sprite.anchor.y = 0.5;
    sprite.position = player.position;
    this.standardCamera.addChildAt(sprite, 1);
  }
  addLevel(level) {
    let texture = new PIXI.Texture.fromImage('./images/test-sky.png');
    let tilingSprite = new PIXI.extras.TilingSprite(texture, level.width+300, level.height+300);
    // tilingSprite.anchor.x = 0.5, tilingSprite.anchor.y = 0.5;
    tilingSprite.tilePosition = level.position;
    tilingSprite.position = new PIXI.Point(-150, -150);
    this.standardCamera.addChildAt(tilingSprite, 0);
    this.level = level;
  }
  get view() {
    return this.renderer.view;
  }
  get camera() {
    return this.standardCamera;
  }
}