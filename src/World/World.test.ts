import World from './World'
import Camera from './Camera'
import Ring from './Ring'

describe('Wold', () => {
  test('Test world initialization', () => {
    const world = new World()
    world.initialize()
    expect(world.camera).toBeInstanceOf(Camera)
    expect(world.ring).toBeInstanceOf(Ring)
  })
})
