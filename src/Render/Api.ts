import * as THREE from 'three'
import Render from './Render'
import Loader from './Loader'

class Api {
  render: Render
  loader: Loader

  constructor() {
    this.render = new Render()
    this.loader = new Loader()
  }

  attachRenderer = (container: HTMLElement) => {
    this.render.resize(container.offsetWidth, container.offsetHeight)
    //TODO: This is being hard to mock
    //container.appendChild(this.render.getRenderer())
  }

  update = () => {
    this.render.update()
  }

  addModel = (path: string) => {
    //TODO: First whe load
    //const model = this.loader.load(path)
    //TODO: Then we add
    //this.render.addModel(model.geometry, model.materials)
  }
}

export default Api
