import TombRaiderMenu from './tombraidermenu'

describe("TombRaider", () => {
  test("Class initialization", () => {
    const menu = new TombRaiderMenu()
    expect(menu).not.toBe(undefined)
    expect(menu.objects).toEqual([])
  })
})
