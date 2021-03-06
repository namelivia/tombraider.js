import { default as ConfigurationApi } from './Configuration/Api'
import { default as WorldApi } from './World/Api'
import { default as ItemApi } from './Item/Api'
import { default as RenderApi } from './Render/Api'
import { default as ActionsApi } from './Actions/Api'

class TombRaiderMenu {
  rendering: RenderApi
  configuration: ConfigurationApi
  world: WorldApi
  item: ItemApi
  actions: ActionsApi

  //TODO: In this case I believe an initialize method will be better
  constructor(containerId: string) {
    //TODO: I'll see what I do with these constructors
    this.world = new WorldApi()
    this.item = new ItemApi()
    this.configuration = new ConfigurationApi()
    this.rendering = new RenderApi()
    this.actions = new ActionsApi()

    const container = document.getElementById(containerId)
    if (container) {
      this.rendering.attachRenderer(container)
    }
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
    if (modelId !== null) {
      let itemsCount = this.item.add(name, model, action, params, modelId)
      //TODO: Add the action and params here
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

  action = () => {
    let event = new CustomEvent('action', {
      detail: { selected: this.item.getSelectedId() },
    })
    document.dispatchEvent(event)
    this.actions.execute(
      this.item.getSelectedAction(),
      this.item.getSelectedParams(),
    )
  }

  animate = () => {
    //Place items
    this.item.modelIds().forEach((id) => {
      this.rendering.placeItem(
        id,
        this.world.getItemX(id),
        this.world.getItemZ(id),
      )
    })

    //Rotate selected item
    this.rendering.rotateItem(this.item.getSelectedId())

    //Place camera
    this.world.updateCameraAngle(this.item.getSelectedRotate())
    this.rendering.placeCamera(
      this.world.getCameraX(),
      this.world.getCameraY(),
      this.world.getCameraZ(),
    )

    //Update rendering
    this.rendering.update()
    requestAnimationFrame(() => this.animate())
  }
}
export default TombRaiderMenu
