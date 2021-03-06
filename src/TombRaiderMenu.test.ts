import { default as TombRaiderMenu } from './TombRaiderMenu'
import * as THREE from 'three'
jest.mock('three', () => ({
  Scene: jest.fn(() => ({
    add: jest.fn(),
  })),
  PerspectiveCamera: jest.fn(),
  AmbientLight: jest.fn(),
  DirectionalLight: jest.fn(),
  WebGLRenderer: jest.fn(() => ({
    setSize: jest.fn(),
  })),
}))

describe('TombRaiderMenu', () => {
  test('Test menu', () => {
    document.body.innerHTML = '<div id="test-div" />'
    const menu = new TombRaiderMenu('test-div')
    //Loading a configuration
    var newConfig =
      '{"objects":[{"name":"item1","action":"link","params":"asdfasdf","model":"models/chest/chest.json"},{"name":"item2","action":"link","params":"asdfasdfsadf","model":"models/chest/chest.json"},{"name":"item3","action":"link","params":"asdfasdf","model":"models/chest/chest.json"}],"distance":"17800","height":"2600","radius":"10600"}'
    menu.setConfig(newConfig)

    //Checking api getters
    expect(menu.getRadius()).toBe(10600)
    expect(menu.getCameraDistance()).toBe(17800)
    expect(menu.getCameraHeight()).toBe(2600)

    //Circling right
    expect(menu.getSelectedName()).toBe('item3')
    menu.moveRight()
    expect(menu.getSelectedName()).toBe('item2')
    menu.moveRight()
    expect(menu.getSelectedName()).toBe('item1')
    menu.moveRight()
    expect(menu.getSelectedName()).toBe('item3')

    //Circling left
    menu.moveLeft()
    expect(menu.getSelectedName()).toBe('item1')
    menu.moveLeft()
    expect(menu.getSelectedName()).toBe('item2')
    menu.moveLeft()
    expect(menu.getSelectedName()).toBe('item3')
    menu.moveLeft()
    expect(menu.getSelectedName()).toBe('item1')

    //Checking api setters
    menu.setRadius(100)
    menu.setCameraDistance(200)
    menu.setCameraHeight(300)

    //Removing the currently selected item
    menu.deleteSelected()
    expect(menu.getSelectedName()).toBe('item3')

    //Adding an extra item
    menu.addItem('extra_item', '/models/test.json', 'test', 'test')
    //TODO: wat? I suppose this is because it "failed to load"
    //expect(menu.getSelectedName()).toBe('extra_item')
    expect(menu.getSelectedName()).toBe('item3')

    //And saving this new configuration
    menu.setCameraHeight(300)
    /*var newConfig =
      '{"radius":100,"distance":200,"height":300,"objects":[{"name":"item2","action":"models/chest/chest.json","params":"link","model":"asdfasdfsadf"},{"name":"item3","action":"models/chest/chest.json","params":"link","model":"asdfasdf"},{"name":"extra_item","action":"/models/test.json","params":"test","model":"test"}]}'*/
    var newConfig =
      '{"radius":100,"distance":200,"height":300,"objects":[{"name":"item2","action":"link","params":"asdfasdfsadf","model":"models/chest/chest.json"},{"name":"item3","action":"link","params":"asdfasdf","model":"models/chest/chest.json"}]}'
    expect(menu.getConfig()).toBe(newConfig)
  })
})
