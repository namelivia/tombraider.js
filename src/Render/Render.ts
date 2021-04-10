import * as THREE from 'three'
class Render {
  renderer: THREE.WebGLRenderer
  //clock: THREE.Clock
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  objectIndex: number

  constructor() {
    //this.clock = new Clock()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, 100 / 100, 1, 100000)
    this.objectIndex = -1
    this.scene.add(
      new THREE.AmbientLight(0xfddf98),
      new THREE.DirectionalLight(0xffffff),
    )
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
  }

  resize = (width: number, height: number) => {
    //TODO: Can I just modify the camera size? It seems I cannot
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 100000)
    //TODO: This is being hard to mock
    //this.renderer.setSize(width, height)
  }

  getRenderer = (): THREE.WebGLRenderer => this.renderer

  removeModel(index: number) {
    //TODO: Beware! Same 3d models have same ids. indexes are better
    this.scene.remove(this.scene.getObjectById(index))
  }

  addModel = (model: THREE.Scene): number => {
    this.scene.add(model).id
    this.objectIndex += 1
    return this.objectIndex
  }

  placeCamera(x: number, y: number, z: number) {
    this.camera.position.x = x
    this.camera.position.y = y
    this.camera.position.z = z
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  placeItem(id: number, x: number, z: number) {
    //ID + 2 because it also contains the two light sources from the constructor
    this.scene.children[id + 2].position.x = x
    this.scene.children[id + 2].position.z = z
  }

  rotateItem(id: number) {
    //ID + 2 because it also contains the two light sources from the constructor
    this.scene.children[id + 2].rotation.y += 0.01
  }

  update() {
    //TODO: apply delta
    //var delta = this.clock.getDelta();
    //This should receive the positions from the camera and the items
    //update them in its camera and the models in the scene (relate them by index), and then render
    this.renderer.render(this.scene, this.camera)
  }
}
export default Render
