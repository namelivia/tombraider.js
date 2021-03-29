import Render from './Render'

class Api {
  render: Render

  constructor(width: number, height: number) {
    this.render = new Render(width, height)
  }

  //TODO: Typing this
  getRenderer = (): any => this.render.getRenderer()
}

export default Api
