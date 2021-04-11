class Camera {
  angle: number
  distance: number
  height: number

  constructor() {
    this.angle = 0
    this.distance = 0
    this.height = 0
  }

  setHeight = (height: number) => {
    this.height = height
  }

  getHeight = () => this.height
  getDistance = () => this.distance

  setDistance = (distance: number) => {
    this.distance = distance
  }

  private getNewAngle = (targetAngle: number) => {
    //Stays where it is
    if (this.angle === targetAngle) {
      return this.angle
    }

    //Or rotates towards the target angle
    let step = 10
    if (this.angle < targetAngle) {
      return this.angle + (targetAngle - this.angle) / step
    }
    return this.angle - (this.angle - targetAngle) / step
  }

  updateAngle = (separation: number, index: number) => {
    this.angle = this.getNewAngle(separation * index)
  }

  getX = (): number => Math.cos(this.angle) * this.distance
  getY = (): number => this.height
  getZ = (): number => Math.sin(this.angle) * this.distance
}
export default Camera
