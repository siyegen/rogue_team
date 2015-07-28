module.exports = class Camera extends PIXI.Container {
  constructor(position, world) {
    super();
    this.pivot.x = position.x, this.pivot.y = position.y;
    this.position.x = position.x, this.position.y = position.y;
    this.scale = new PIXI.Point(1,1);
    this.isZoomed = false;
    this.world = world;
    this.addChild(this.world);
    this.target = null;
  }
  zoom() {
    if (this.isZoomed) {
      this.scale.set(1);
      this.isZoomed = false;
    } else {
      this.scale.set(0.5);
      this.isZoomed = true;
    }
  }
  update() {}
}