import ConfigManager from './ConfigManager'
import ItemsCollection from './ItemsCollection'
import Item from './Item'
import Scene from './Scene'
import Camera from './Camera'
import Ring from './Ring'

class TombRaiderMenu {

    items: ItemsCollection
    scene: Scene
    camera: Camera
    ring: Ring

    constructor (containerId: string) {
        this.items = new ItemsCollection()
        //TODO: width and height
        this.scene  = new Scene(200, 300)
        this.camera = new Camera()
        this.ring = new Ring()

        this.setRadius(6000)

        //Position camera
        this.camera.setDistance(12000)
        this.camera.setHeight(3000)
    }

    //This will probably go away
    goToLink (url: string) {
        window.location.href = url
    }

    //api
    moveLeft() {
      this.items.select(1)
    }

    //api
    moveRight() {
      this.items.select(-1)
    }

    //api
    /**
    * @deprecated Since version 0.2. Will be deleted in version 1.0. Use addItem instead.
    */
    addModel(name: string, model:string, action:string, params:string) {
        this.addItem(name, model, action, params)
    }

    //api
    addItem(name: string, model:string, action:string, params:string) {
      let newItem = new Item(this.items.count(), name, model, action, params)
      this.items.add(newItem)
      //Now the ring needs to update
      this.ring.updateSeparation(this.items.count())
    }

    //api
    getSelectedName(): string {
      if (this.items.selected()) {
        return this.items.selected().name
      }
    }

    //api
    getRadius () {
      return this.ring.getRadius()
    }

    //api
    getCameraDistance () {
      return this.camera.getDistance()
    }

    //api
    getCameraHeight () {
      return this.camera.getHeight()
    }

    //api
    setRadius (radius: number) {
      this.ring.setRadius(radius)
    }

    //api
    setCameraHeight (height: number) {
      this.camera.setHeight(height)
    }

    //api
    setCameraDistance (distance: number) {
      this.camera.setDistance(distance)
    }

    //This will probably go away
    update () {
    
      //Rotates the camera if needed, and place it
      this.camera.updateAngle(this.ring.getSeparation(), this.items.getSelectedIndex())
      this.scene.placeCamera(this.camera.getX(), this.camera.getY() , this.camera.getZ())

      // Calculate the item placement
      for (var i = 0; i < this.items.count(); i++) {
        if (i === this.selected) {
          this.items[i].rotation.y += 0.01
        }
        this.items[i].position.x = this.ring.getItemX(i)
        this.items[i].position.z = this.ring.getItemZ(i)
      }
      this.scene.update()
    }

    //api
    deleteSelected () {
      var selectedObject = this.items.selected()
      this.scene.removeModel(this.items.getSelectedIndex()) //TODO: this would be the index
      this.items.remove(selectedObject)
      if (!this.items.empty()) {
        this.moveLeft()
      }
    }

    //api
    setConfig (configJson: string) {
      const manager = new ConfigManager()
      const config = manager.load(configJson)
      this.setRadius(config.radius)
      this.setCameraDistance(config.distance)
      this.setCameraHeight(config.height)
      
      //TODO: WIP
      /*var objectsLength = config.objects.length
      for (var i = 0; i < objectsLength; i++) {
        this.addModel(
          config.objects[i].name,
          config.objects[i].model,
          config.objects[i].action,
          config.objects[i].params
        )
      }*/
    }

    //api
    getConfig() {
      return JSON.stringify({
          "items": this.items.serialize(),
          "distance": this.getCameraDistance(),
          "height": this.getCameraHeight(),
          "radius": this.getRadius()
      })
    }
}
export default TombRaiderMenu
