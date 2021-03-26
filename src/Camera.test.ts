import Camera from './Camera'

describe("Camera", () => {
  test("Test setting camera height", () => {
    const camera = new Camera()
    camera.setHeight(20)
    expect(camera.getHeight()).toBe(20)
  })

  test("Test positioning camera", () => {
    const camera = new Camera()
    camera.setHeight(10)
    camera.setDistance(5)
    camera.updateAngle(10, 2)
    expect(camera.getX()).toBe(-2.080734182735712)
    expect(camera.getY()).toBe(10)
    expect(camera.getZ()).toBe(4.546487134128409)
    camera.setHeight(2)
    camera.setDistance(7)
    camera.updateAngle(10, 1)
    expect(camera.getX()).toBe(-6.595556384680607)
    expect(camera.getY()).toBe(2)
    expect(camera.getZ()).toBe(2.3449170510913357)
  })
})
