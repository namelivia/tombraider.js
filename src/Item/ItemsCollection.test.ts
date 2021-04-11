import ItemsCollection from './ItemsCollection'
import Item from './Item'

describe('ItemsCollection', () => {
  test('Test initializing an empty item collection', () => {
    const collection = new ItemsCollection()
    expect(collection.count()).toEqual(0)
    expect(collection.empty()).toBe(true)
    expect(collection.selected()).toBe(undefined)
  })

  test('Test adding an item to the collection', () => {
    const collection = new ItemsCollection()
    const item = new Item(
      1,
      'testName',
      'testModel',
      'testAction',
      'testParams',
      1,
    )
    collection.add(item)
    expect(collection.count()).toEqual(1)
    expect(collection.empty()).toBe(false)
    expect(collection.selected()).toBe(item)
  })

  test('Test serialilzing an items collection', () => {
    const collection = new ItemsCollection()
    expect(collection.serialize()).toEqual([])
    const item = new Item(
      1,
      'testName',
      'testModel',
      'testAction',
      'testParams',
      1,
    )
    collection.add(item)
    expect(collection.serialize()).toEqual([
      {
        //:index: 1, TODO
        name: 'testName',
        action: 'testAction',
        params: 'testParams',
        model: 'testModel',
      },
    ])
  })
})
