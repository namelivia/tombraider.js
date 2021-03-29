import * as THREE from 'three'
class Render {
  renderer: THREE.WebGLRenderer
  //clock: THREE.Clock
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera

  constructor() {
    //this.clock = new Clock()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, 100 / 100, 1, 100000)
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
    this.scene.remove(this.scene.getObjectById(index))
  }

  addModel(geometry: any, materials: any) {
    this.scene.add(
      new THREE.Mesh(
        geometry,
        //TODO: This was removed, I think this is how it works now
        //new THREE.MeshFaceMaterial(materials)
        new THREE.MeshBasicMaterial(materials),
      ),
    )
    //TODO: Or it could also be
    //var mesh = new THREE.Mesh(geometry, materials );
    //Assuming materials is an array of materials.
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
