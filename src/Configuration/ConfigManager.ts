import Config from './Config'

class ConfigManager {
  load(configJson: string) {
    const data = JSON.parse(configJson)
    const config = new Config(
      parseInt(data.radius),
      parseInt(data.distance),
      parseInt(data.height),
    )
    config.validate()
    return config
  }
}

export default ConfigManager
