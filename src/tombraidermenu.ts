import ConfigManager from './ConfigManager'
class TombRaiderMenu {
    constructor (containerId: string): TombRaiderMenu {
        this.objects = []
    }

    goToLink (url: string) {
        window.location.href = url
    }

    newScene () {
      this.cameraAngle = 0
      this.angleStep = 0
        //this.setRadius(6000)
        //this.setCameraDistance(12000)
        //this.setCameraHeight(3000)
        //this.deleteAllObjects()
      this.selected = 0
      this.selectedRotate = 0
    }

    move(direction: int) {
      if (this.objects.length) {
        this.selected = this.mod(this.selected + direction, this.objects.length)
        console.log(this.selected)
      }
      this.selectedRotate += direction
      console.log(this.selectedRotate)
    }

    moveLeft() {
      this.move(1)
    }

    moveRight() {
      this.move(-1)
    }

    addModel(name: string, url:string, action:string, params:string) {
      let newModel = { name: name, model: url, action: action, params: params }
      this.loadModel(newModel, this.scene, this.objects)
    }

    getSelectedName(): string {
      if (this.objects[this.selected]) {
        return this.objects[this.selected].name
      }
    }

    action() {
      var event = new CustomEvent("action", {
        detail: { selected: this.selected },
      })
      document.dispatchEvent(event)
      if (this.objects[this.selected]) {
        switch (this.objects[this.selected].action) {
          case "link":
            this.goToLink(this.objects[this.selected].params)
            break
          case "alert":
            alert(this.objects[this.selected].params)
            break
          case "":
            break
          default:
            console.error("Unknown action")
        }
      }
    }

    getRadius () {
      return this.radius
    }

    getCameraDistance () {
      return this.cameraDistance
    }

    getCameraHeight () {
      return this.camera.position.y
    }

    setRadius (value: int) {
      this.radius = value
    }

    setCameraHeight (value: int) {
      this.camera.position.y = value
    }

    setCameraDistance (value: int) {
      this.cameraDistance = value
    }

    update () {
      requestAnimationFrame(TombRaiderMenu.prototype.update.bind(this))
      //TODO: apply delta
      //var delta = this.clock.getDelta();

      if (this.cameraAngle !== this.angleStep * this.selectedRotate) {
        if (this.cameraAngle < this.angleStep * this.selectedRotate) {
          this.cameraAngle =
            this.cameraAngle +
            (this.angleStep * this.selectedRotate - this.cameraAngle) / 10
        } else {
          this.cameraAngle =
            this.cameraAngle -
            (this.cameraAngle - this.angleStep * this.selectedRotate) / 10
        }
      }
      this.camera.position.x = Math.cos(this.cameraAngle) * this.cameraDistance
      this.camera.position.z = Math.sin(this.cameraAngle) * this.cameraDistance
      this.camera.lookAt(new window.THREE.Vector3(0, 0, 0))
      if (this.objects.length) {
        for (var i = 0; i < this.objects.length; i++) {
          if (i === this.selected) {
            this.objects[i].rotation.y += 0.01
          }
          this.objects[i].position.x = Math.cos(this.angleStep * i) * this.radius
          this.objects[i].position.z = Math.sin(this.angleStep * i) * this.radius
        }
      }
      this.render()
    }

    render () {
      this.renderer.render(this.scene, this.camera)
    }

    mod () {
        return ((a % b) + b) % b
    }

    deleteAllObjects () {
      while (this.objects.length > 0) {
        this.deleteSelected()
      }
    }

    deleteSelected () {
      var selectedObject = this.objects[this.selected]
      this.scene.remove(selectedObject)
      this.objects.splice(this.selected, 1)
      if (this.selected > 0) {
        this.moveLeft()
      }
    }

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

    getConfig() {
      var config = {}
      var objects = this.objects.map(function (obj) {
        return {
          name: obj.name,
          action: obj.action,
          params: obj.params,
          model: obj.model,
        }
      })
      config.objects = objects
      config.distance = this.getCameraDistance()
      config.height = this.getCameraHeight()
      config.radius = this.getRadius()
      return JSON.stringify(config)
    }

    loadModel(model, scene, objects) {
      var loader = new window.THREE.JSONLoader()
      loader.load(
        model.model,
        function (geometry, materials) {
          var material = new window.THREE.MeshFaceMaterial(materials)
          var object = new window.THREE.Mesh(geometry, material)
          scene.add(object)
          object.name = model.name
          object.action = model.action
          object.params = model.params
          object.model = model.model
          objects.push(object)
          this.angleStep = (360 / objects.length) * (Math.PI / 180)
          //TODO: Set the selected.
        }.bind(this)
      )
    }

}
export default TombRaiderMenu
