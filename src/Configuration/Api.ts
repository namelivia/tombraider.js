import Config from './Config'
import ConfigManager from './ConfigManager'

class Api {
  load = (json: string): Config => {
    const manager = new ConfigManager()
    return manager.load(json)
  }
  save = (
    radius: number,
    distance: number,
    height: number,
    objects: Array<{
      name: string
      model: string
      action: string
      params: string
    }>,
  ): string => new Config(radius, distance, height, objects).save()
}

export default Api
