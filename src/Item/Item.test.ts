import Item from './Item'

describe('Item', () => {
  test('Test getting an item name', () => {
    const item = new Item(
      1,
      'testName',
      'testModel',
      'testAction',
      'testParams',
      1,
    )
    expect(item.getName()).toEqual('testName')
  })

  test('Test serializing an item', () => {
    const item = new Item(
      1,
      'testName',
      'testModel',
      'testAction',
      'testParams',
      1,
    )
    expect(item.serialize()).toEqual({
      //index: 1, TODO
      name: 'testName',
      action: 'testAction',
      params: 'testParams',
      model: 'testModel',
    })
  })
})
