import * as THREE from 'three'
class Render {
  renderer: any
  //clock: any
  scene: any
  camera: any
  loader: any

  constructor(width: number, height: number) {
    //this.clock = new Clock()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 100000)
    this.scene.add(
      new THREE.AmbientLight(0xfddf98),
      new THREE.DirectionalLight(0xffffff),
    )
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    //TODO: This is being hard to mock
    //this.renderer.setSize(width, height)
  }

  //TODO: Here I should use definetly typed
  getRenderer = (): THREE.WebGLRenderer => this.renderer

  removeModel(index: number) {
    this.scene.remove(index)
  }

  loadModel(path: string) {
    throw 'Json loader is no loger supported'
    //TODO: This format is no longer supported
    //loader = new window.THREE.JSONLoader()
    /*loader.load(
          path,
          (geometry, materials) => {
            this.scene.add(
                new THREE.Mesh(
                    geometry,
                    new THREE.MeshFaceMaterial(materials)
                )
            )
          }
    )*/
  }

  placeCamera(x: number, y: number, z: number) {
    this.camera.position.x = x
    this.camera.position.y = y
    this.camera.position.z = z
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
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
