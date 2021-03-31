import { default as ConfigurationApi } from './Configuration/Api'
import { default as WorldApi } from './World/Api'
import { default as ItemApi } from './Item/Api'
import { default as RenderApi } from './Render/Api'

class TombRaiderMenu {
  rendering: RenderApi
  configuration: ConfigurationApi
  world: WorldApi
  item: ItemApi

  //TODO: In this case I believe an initialize method will be better
  constructor(containerId: string) {
    //TODO: I'll see what I do with these constructors
    this.world = new WorldApi()
    this.item = new ItemApi()
    this.configuration = new ConfigurationApi()
    this.rendering = new RenderApi()

    const container = document.getElementById(containerId)
    if (container) {
      this.rendering.attachRenderer(container)
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

  addItem = async (
    name: string,
    model: string,
    action: string,
    params: string,
  ) => {
    let modelId = await this.rendering.addModel(model)
    if (modelId) {
      let itemsCount = this.item.add(name, model, action, params, modelId)
      this.world.setItemsNumber(itemsCount)
    }
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

  animate = () => {
    this.item.modelIds().forEach((id) => {
      this.rendering.placeItem(
        id,
        this.world.getItemX(id),
        this.world.getItemZ(id),
      )
    })
    this.rendering.rotateItem(this.item.getSelectedId())
    this.rendering.placeCamera(
      this.world.getCameraX(),
      this.world.getCameraY(),
      this.world.getCameraZ(),
    )
    this.rendering.update()
    requestAnimationFrame(() => this.animate())
  }
}
export default TombRaiderMenu
