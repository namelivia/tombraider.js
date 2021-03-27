import Config from './Config'

describe('Config', () => {
  test('Test saving a configuration', () => {
    const config = new Config(10, 20, 30)
      expect(config.save()).toBe("{\"radius\":10,\"distance\":20,\"height\":30}")
  })
})
