import TombRaiderMenu from './tombraidermenu'

describe("TombRaider", () => {
  test("Class initialization", () => {
    const menu = new TombRaiderMenu()
    expect(menu).not.toBe(undefined)
    expect(menu.objects).toEqual([])
  })

  test("Test navigate to link", () => {
    const menu = new TombRaiderMenu()
      //menu.goToLink('https://foo.bar')
  })

  test("Test new scene", () => {
    const menu = new TombRaiderMenu()
    menu.newScene()
  })

  test("Test move", () => {
    const menu = new TombRaiderMenu()
    menu.move(1)
  })

  test("Test move left", () => {
    const menu = new TombRaiderMenu()
    menu.moveRight()
  })

  test("Test move right", () => {
    const menu = new TombRaiderMenu()
    menu.moveLeft()
  })

  test("Test add model", () => {
    const menu = new TombRaiderMenu()
    menu.moveLeft()
  })
})
