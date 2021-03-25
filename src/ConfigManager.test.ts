import ConfigManager from './ConfigManager'
import Config from './Config'

describe("ConfigManager", () => {
  test("Test loading an unparseable configuration", () => {
    const configManager = new ConfigManager()
    const configurationString = 'invalid'
    expect(() => {configManager.load(configurationString)}).toThrow(SyntaxError)
  })

  test("Test loading an invalid configuration", () => {
    const configManager = new ConfigManager()
    const configurationString = '{"foo": "bar"}'
    expect(() => {configManager.load(configurationString)}).toThrow("Invalid configuration: invalid radius")
  })

  test("Test loading an invalid configuration, missing some parameter", () => {
    const configManager = new ConfigManager()
    const configurationString = '{"radius": 3, "distance": 2}'
    expect(() => {configManager.load(configurationString)}).toThrow("Invalid configuration: invalid height")
  })

  test("Test loading an invalid configuration, invalid mismatch", () => {
    const configManager = new ConfigManager()
    const configurationString = '{"radius": 3, "distance": "notvalid"}'
    expect(() => {configManager.load(configurationString)}).toThrow("Invalid configuration: invalid distance")
  })

  test("Test loading a valid configuration", () => {
    const configManager = new ConfigManager()
    const configurationString = '{"radius": 3, "distance": 2, "height": 32}'
    const config = configManager.load(configurationString)
    expect(config).toBeInstanceOf(Config)
  })
})
