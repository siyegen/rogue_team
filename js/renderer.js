module.exports = class Renderer {
  constructor(viewportWidth, viewportHeight) {
    this.stage = new PIXI.Container();
    // viewport, more or less
    this.standardCamera = new PIXI.Container();
    // this.container.x = viewportWidth/2, this.container.y = viewportHeight/2;
    this.renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight);
    this.stage.addChild(this.standardCamera);


    // Test gfx
    this.grid = new PIXI.Graphics();
    this.grid.position.x = 0, this.grid.position.y = 0;
    this.standardCamera.addChild(this.grid);
  }
  render() {
    this.renderer.render(this.stage);
    // Test gfx
    this.grid.clear();
    this.grid.lineStyle(2, 0x7777FD, 1);
    for (let i = 9; i >= 0; i--) {
      this.grid.moveTo(i*50, 0);
      this.grid.lineTo(i*50, 800);
    }
  }
  add(obj) {
    let sprite = new PIXI.Sprite.fromImage('./images/test-player.png');
    sprite.anchor.x = 0.5, sprite.anchor.y = 0.5;
    sprite.position = obj.position;
    this.standardCamera.addChild(sprite);
  }
  get view() {
    return this.renderer.view;
  }
  get camera() {
    return this.standardCamera;
  }
}