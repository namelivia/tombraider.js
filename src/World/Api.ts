import World from './World'

class Api {
  world: World
  constructor() {
    //TODO: I'm not very sure about this...
    this.world = new World()
    this.world.initialize()
  }

  getCameraDistance = (): number => this.world.getCameraDistance()
  getCameraHeight = (): number => this.world.getCameraHeight()
  setCameraDistance = (distance: number) =>
    this.world.setCameraDistance(distance)
  setCameraHeight = (height: number) => this.world.setCameraHeight(height)
  setRadius = (radius: number) => this.world.setRadius(radius)
  getRadius = (): number => this.world.getRadius()
  setItemsNumber = (itemsCount: number) => this.world.setItemsNumber(itemsCount)

  //TODO: This is probably unecessary complexity. (Use a type? and just one function?)
  getCameraX = (): number => this.world.getCameraX()
  getCameraY = (): number => this.world.getCameraY()
  getCameraZ = (): number => this.world.getCameraZ()
  updateCameraAngle = (index: number) => this.world.updateCameraAngle(index)

  getItemX = (index: number): number => this.world.getItemX(index)
  getItemZ = (index: number): number => this.world.getItemZ(index)
}

export default Api
