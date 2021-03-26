import Ring from './Ring'

describe("Ring", () => {
  test("Test initializing", () => {
    const ring = new Ring()
    expect(ring.separation).toBe(0)
  })

  test("Test modifying radius", () => {
    const ring = new Ring()
    ring.setRadius(120)
    expect(ring.getRadius()).toBe(120)
  })

  test("Test modifying separation", () => {
    const ring = new Ring()
    ring.updateSeparation(4)
    expect(ring.getSeparation()).toBe(1.5707963267948966)
    ring.updateSeparation(8)
    expect(ring.getSeparation()).toBe(0.7853981633974483)
  })

  test("Test positioning items", () => {
    const ring = new Ring()
    ring.updateSeparation(4)
    ring.setRadius(120)
    expect(ring.getSeparation()).toBe(1.5707963267948966)
    expect(ring.getItemX(2)).toBe(-120)
    expect(ring.getItemZ(2)).toBe(1.469576158976824e-14)
    ring.setRadius(50)
    ring.updateSeparation(8)
    expect(ring.getSeparation()).toBe(0.7853981633974483)
    expect(ring.getItemX(1)).toBe(35.35533905932738)
    expect(ring.getItemZ(1)).toBe(35.35533905932737)
  })
})
