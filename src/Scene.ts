class Scene {
  renderer: any
  clock: any
  scene: any
  camera: any
  loader: any

  constructor(width: number, height: number) {
    this.clock = new window.THREE.Clock()
    this.scene = new window.THREE.Scene()
    this.loader = new window.THREE.JSONLoader()
    this.camera = new window.THREE.PerspectiveCamera(
      50,
      width / height,
      1,
      100000,
    )
    this.renderer = new window.THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(width, height)

    /* Setup lighting */
    let ambientLight = new window.THREE.AmbientLight(0xfddf98)
    let directionalLight = new window.THREE.DirectionalLight(0xffffff)
    this.scene.add(directionalLight, ambientLight)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  removeModel(index: number) {
    this.scene.remove(index)
  }

  loadModel(path: string) {
    this.loader.load(
      path,
      function (geometry, materials) {
        let material = new window.THREE.MeshFaceMaterial(materials)
        let model = new window.THREE.Mesh(geometry, material)
        this.scene.add(model)
      }.bind(this),
    )
  }

  placeCamera(x: number, y: number, z: number) {
    this.camera.position.x = x
    this.camera.position.y = y
    this.camera.position.z = z
    this.camera.lookAt(new window.THREE.Vector3(0, 0, 0))
  }

  update() {
    //TODO: apply delta
    //var delta = this.clock.getDelta();
    //not sure about this one requestAnimationFrame(undefined)
    this.render()
  }
}
export default Scene
