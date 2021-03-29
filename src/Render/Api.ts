import * as THREE from 'three'
import Render from './Render'

class Api {
  render: Render

  constructor(width: number, height: number) {
    this.render = new Render(width, height)
  }

  //TODO: Typing this
  getRenderer = (): THREE.WebGLRenderer => this.render.getRenderer()
}

export default Api
