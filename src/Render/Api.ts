import * as THREE from 'three'
import Render from './Render'
import Loader from './Loader'

class Api {
  render: Render
  loader: Loader

  constructor(width: number, height: number) {
    this.render = new Render(width, height)
    this.loader = new Loader()
  }

  getRenderer = (): THREE.WebGLRenderer => this.render.getRenderer()
  addModel = (path: string) => {
    //TODO: First whe load
    //const model = this.loader.load(path)
    //TODO: Then we add
    //this.render.addModel(model.geometry, model.materials)
  }
}

export default Api
