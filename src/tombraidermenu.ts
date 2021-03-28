//import Scene from './Scene'
import { default as ConfigurationApi } from './Configuration/Api'
import { default as WorldApi } from './World/Api'
import { default as ItemApi } from './Item/Api'

class TombRaiderMenu {
  //scene: Scene
  configuration: ConfigurationApi
  world: WorldApi
  item: ItemApi

  constructor(containerId: string) {
    //TODO: width and height
    //this.scene = new Scene(200, 300)
  }

  //TODO: This will probably go away
  goToLink(url: string) {
    window.location.href = url
  }

  moveLeft() {
    this.item.selectNext()
  }

  moveRight() {
    this.item.selectPrevious()
  }

  /**
   * @deprecated Since version 0.2. Will be deleted in version 1.0. Use addItem instead.
   */
  addModel(name: string, model: string, action: string, params: string) {
    this.addItem(name, model, action, params)
  }

  addItem(name: string, model: string, action: string, params: string) {
    this.item.add(name, model, action, params)
  }

  getSelectedName(): string {
    return this.item.getSelectedName()
  }

  getRadius() {
    return this.world.getRadius()
  }

  getCameraDistance() {
    return this.world.getCameraDistance()
  }

  getCameraHeight() {
    return this.world.getCameraHeight()
  }

  setRadius(radius: number) {
    this.world.setRadius(radius)
  }

  setCameraHeight(height: number) {
    this.world.setCameraHeight(height)
  }

  setCameraDistance(distance: number) {
    this.world.setCameraDistance(distance)
  }

  deleteSelected() {
      this.item.deleteSelected()
  }

  setConfig(json: string) {
    var config = this.configuration.load(json)

    this.world.setRadius(config.radius)
    this.world.setCameraDistance(config.distance)
    this.world.setCameraHeight(config.height)

    this.item.addMany(config.objects)
  }

  getConfig() {
    return this.configuration.save(
        this.world.getRadius(),
        this.world.getCameraDistance(),
        this.world.getCameraHeight(),
        this.item.serialize()
    )
  }
}
export default TombRaiderMenu
