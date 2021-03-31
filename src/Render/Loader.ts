import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
class Loader {
  loader: GLTFLoader

  constructor() {
    this.loader = new GLTFLoader()
  }

  //TODO: Type this properly. Type === GLFT
  load = (path: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.loader.load(path, (data) => resolve(data), null, reject)
    })
  }
}
export default Loader
