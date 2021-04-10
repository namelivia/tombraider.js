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
    //container.appendChild(this.render.getRenderer().domElement)
  }

  update = () => {
    this.render.update()
  }

  placeCamera = (x: number, y: number, z: number) => {
    this.render.placeCamera(x, y, z)
  }

  placeItem = (id: number, x: number, z: number) => {
    this.render.placeItem(id, x, z)
  }

  rotateItem = (id: number) => {
    this.render.rotateItem(id)
  }

  addModel = async (path: string): Promise<number | null> => {
    try {
      const model = await this.loader.load(path)
      return this.render.addModel(model.scene)
    } catch (err) {
      console.log(`Error loading model ${path}: ${err}`)
      return null
    }
  }
}

export default Api
