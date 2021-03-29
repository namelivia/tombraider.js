import Item from './Item'
class ItemsCollection {
  items: Array<Item>
  _selected: number

  constructor() {
    this.items = []
    this._selected = 0
  }

  empty = (): boolean => this.items.length === 0
  count = (): number => this.items.length
  selected = (): Item => this.items[this._selected]

  add = (item: Item) => {
    this._selected = this.items.push(item) - 1
  }

  remove = (item: Item) => {
    this.items.splice(this.items.indexOf(item), 1)
  }

  serialize = (): Array<{
    name: string
    model: string
    action: string
    params: string
  }> => {
    return this.items.map(function (item) {
      return item.serialize()
    })
  }

  select = (direction: number) => {
    if (!this.empty()) {
      let itemsCount = this.count()
      this._selected =
        (this._selected + (direction % itemsCount) + itemsCount) % itemsCount
    }
  }
}
export default ItemsCollection
