//import Scene from './Scene'
import { default as ConfigurationApi } from './Configuration/Api'
import { default as WorldApi } from './World/Api'
import { default as ItemApi } from './Item/Api'
import { default as RenderApi } from './Render/Api'

class TombRaiderMenu {
  render: RenderApi
  configuration: ConfigurationApi
  world: WorldApi
  item: ItemApi

  //TODO: In this case I believe an initialize method will be better
  constructor(containerId: string) {
    //TODO: I'll see what I do with these constructors
    this.world = new WorldApi()
    this.item = new ItemApi()
    this.configuration = new ConfigurationApi()

    //TODO: Should this be responsability of the lib?
    const container = document.getElementById(containerId)
    if (container) {
      this.render = new RenderApi(container.offsetWidth, container.offsetHeight)
      //TODO: This is beinig hard to mock
      //container.appendChild(this.render.getRenderer())
    }
  }

  //TODO: This will probably go away
  goToLink = (url: string) => {
    window.location.href = url
  }

  moveLeft = () => {
    this.item.selectNext()
  }

  moveRight = () => {
    this.item.selectPrevious()
  }

  /**
   * @deprecated Since version 0.2. Will be deleted in version 1.0. Use addItem instead.
   */
  addModel = (name: string, model: string, action: string, params: string) => {
    this.addItem(name, model, action, params)
  }

  addItem = (name: string, model: string, action: string, params: string) => {
    this.item.add(name, model, action, params)
  }

  getSelectedName = (): string => this.item.getSelectedName()
  getRadius = () => this.world.getRadius()
  getCameraDistance = () => this.world.getCameraDistance()
  getCameraHeight = () => this.world.getCameraHeight()

  setRadius = (radius: number) => {
    this.world.setRadius(radius)
  }

  setCameraHeight = (height: number) => {
    this.world.setCameraHeight(height)
  }

  setCameraDistance = (distance: number) => {
    this.world.setCameraDistance(distance)
  }

  deleteSelected = () => {
    this.item.deleteSelected()
  }

  setConfig = (json: string) => {
    var config = this.configuration.load(json)

    this.world.setRadius(config.radius)
    this.world.setCameraDistance(config.distance)
    this.world.setCameraHeight(config.height)

    this.item.addMany(config.objects)
  }

  getConfig = () => {
    return this.configuration.save(
      this.world.getRadius(),
      this.world.getCameraDistance(),
      this.world.getCameraHeight(),
      this.item.serialize(),
    )
  }

  //TODO: This is how I would start the animation loop
  animate = () => {
    console.log('Animation frame')
    requestAnimationFrame(() => this.animate())
  }

  //And then the startup would be like:
  /*
   * let game = new Game();
   * game.animate();
   *
   */
}
export default TombRaiderMenu
