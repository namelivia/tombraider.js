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

    constructor (containerId: string): TombRaiderMenu {
        this.items = new ItemsCollection()
        this.scene  = new Scene()
        this.camera = new Camera()
        this.ring = new Ring()
        this.newScene()
    }

    //This will probably go away
    goToLink (url: string) {
        window.location.href = url
    }

    newScene () {
      this.setRadius(6000)

      //Position camera
      this.camera.setAngle(0)
      this.camera.setDistance(12000)
      this.camera.setHeight(3000)

      this.deleteAllObjects()
      this.selected = 0
      this.selectedRotate = 0
    }

    //This will probably go away
    move(direction: int) {
      if (!this.items.empty()) {
        this.selected = this.mod(this.selected + direction, this.items.count())
        console.log(this.selected)
      }
      this.selectedRotate += direction
      console.log(this.selectedRotate)
    }

    //stay
    moveLeft() {
      this.move(1)
    }

    //stay
    moveRight() {
      this.move(-1)
    }

    /**
    * @deprecated Since version 0.2. Will be deleted in version 1.0. Use addItem instead.
    */
    addModel(name: string, model:string, action:string, params:string) {
        this.addItem(name, model, action, params)
    }

    //stay
    addItem(name: string, model:string, action:string, params:string) {
      let newItem = new Item(name, model, action, params)
      this.items.add(newItem)
      this.scene.loadModel(model)
    }

    //stay
    getSelectedName(): string {
      if (this.items.selected()) {
        return this.items.selected().name
      }
    }

    //stay
    getRadius () {
      return this.ring.getRadius()
    }

    //stay
    getCameraDistance () {
      return this.camera.getDistance()
    }

    //stay
    getCameraHeight () {
      return this.camera.getHeight()
    }

    //stay
    setRadius (radius: int) {
      this.ring.setRadius(radius)
    }

    //stay
    setCameraHeight (height: int) {
      this.camera.setHeight(height)
    }

    //stay
    setCameraDistance (distance: int) {
      this.camera.setDistance(distance)
    }

    getNewCameraAngle() {
      let currentAngle = this.camera.angle()
      let targetAngle = this.ring.getSeparation() * this.selectedRotate
      if (currentAngle === targetAngle) {
        return currentAngle
      }
      //Rotate towards the target angle
      if (currentAngle < targetAngle) {
        return currentAngle + (targetAngle - currentAngle) / 10
      }
      return currentAngle - (currentAngle - targetAngle) / 10
    }

    //This will probably go away
    update () {
      requestAnimationFrame(TombRaiderMenu.prototype.update.bind(this))
      //TODO: apply delta
      //var delta = this.clock.getDelta();
    

      //Update the camera angle if needed
      this.camera.setAngle(this.getNewCameraAngle())

      //Place the camera on the scene
      this.scene.placeCamera(this.camera.getX(), this.camera.getY() , this.camera.getZ())

      // Place the items
      if (!this.items.empty()) {
        for (var i = 0; i < this.items.count(); i++) {
          if (i === this.selected) {
            this.items[i].rotation.y += 0.01
          }
          this.items[i].position.x = this.ring.getItemX(i)
          this.items[i].position.z = this.ring.getItemZ(i)
        }
      }
      this.render()
    }

    //This will probably go away
    render () {
      this.scene.render()
    }

    //This will probably go away
    mod () {
        return ((a % b) + b) % b
    }

    //This will probably go away
    deleteAllObjects () {
      while (!this.items.empty()) {
        this.deleteSelected()
      }
    }

    //stay
    deleteSelected () {
      var selectedObject = this.items.selected()
      this.scene.removeModel(selectedObject) //TODO: this would be the index
      this.items.remove(selectedObject)
      if (!this.items,empty()) {
        this.moveLeft()
      }
    }

    //stay
    setConfig (configJson: string) {
      this.newScene()
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

    //stay
    getConfig() {
      return JSON.stringify({
          "items": this.items.serialize(),
          "distance": this.getCameraDistance(),
          "height": this.getCameraHeight(),
          "radius": this.getRadius()
      })
    }

    //This will probably go away
    loadModel(model, scene, items) {
      var loader = new window.THREE.JSONLoader()
      loader.load(
        model.model,
        function (geometry, materials) {
          let newItem(name, action, params, model)
          this.items.addItem(newItem)
          this.ring.updateSeparation(this.items.count())
          //TODO: Set the selected.
        }.bind(this)
      )
    }

}
export default TombRaiderMenu
