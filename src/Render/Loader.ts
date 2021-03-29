class Loader {
  //TODO: This format is no longer supported
  //loader: any

  constructor() {
    //TODO: This format is no longer supported
    //this.loader = new THREE.JSONLoader()
  }

  //TODO: I suppose this will be async
  load = /*async*/ (path: string): { geometry: any; materials: any } => {
    //TODO: This format is no longer supported
    throw 'Json loader is no loger supported'
    //return await this.loader.load(path)
  }
}
export default Loader
