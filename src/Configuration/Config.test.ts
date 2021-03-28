import Config from './Config'

describe('Config', () => {
  test('Test saving a configuration with no objects', () => {
    const config = new Config(10, 20, 30, [])
      expect(config.save()).toBe("{\"radius\":10,\"distance\":20,\"height\":30,\"objects\":[]}")
  })

  test('Test saving a configuration with objects', () => {
    const config = new Config(10, 20, 30, [
        {"name": "test", "model": "test", "action": "test", "params" : ""}
    ])
    expect(config.save()).toBe("{\"radius\":10,\"distance\":20,\"height\":30,\"objects\":[{\"name\":\"test\",\"model\":\"test\",\"action\":\"test\",\"params\":\"\"}]}")
  })
})
