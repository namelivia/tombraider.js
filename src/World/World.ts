import Camera from './Camera'
import Ring from './Ring'
class World {
  camera: Camera
  ring: Ring

  initialize() {
    this.camera = new Camera()
    this.ring = new Ring()
    this.ring.setRadius(6000)
    this.camera.setDistance(12000)
    this.camera.setHeight(3000)
  }

  getCameraDistance = (): number => this.camera.getDistance()
  getCameraHeight = (): number => this.camera.getHeight()

  setCameraHeight = (height: number) => {
    this.camera.setHeight(height)
  }

  //TODO: This is probably unecessary complexity. (Use a type? and just one function?)
  getCameraX = (): number => this.camera.getX()
  getCameraY = (): number => this.camera.getY()
  getCameraZ = (): number => this.camera.getZ()

  setCameraDistance = (distance: number) => {
    this.camera.setDistance(distance)
  }

  setRadius = (radius: number) => {
    this.ring.setRadius(radius)
  }

  getRadius = () => this.ring.getRadius()

  setItemsNumber = (itemsCount: number) => {
    this.ring.setItemsNumber(itemsCount)
  }
}
export default World
