module.exports = class Camera extends PIXI.Container {
  constructor(position, width, height) {
    super();
    this.pivot.x = position.x, this.pivot.y = position.y;
    this.position.x = position.x, this.position.y = position.y;
    this.width = width, this.height = height;
    this.scale = new PIXI.Point(1,1);
    this.isZoomed = false;
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
}