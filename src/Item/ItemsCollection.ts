import Item from './Item'
class ItemsCollection {
  items: Array<Item>
  _selected: number
  selectedRotate: number

  constructor() {
    this.items = []
    this._selected = 0
    this.selectedRotate = -1
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

  modelIds = (): Array<number> => this.items.map((item) => item.modelId)

  getSelectedRotate = (): number => this.selectedRotate

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
      this.selectedRotate = this.selectedRotate + direction
      this._selected = (this._selected + direction + itemsCount) % itemsCount
    }
  }
}
export default ItemsCollection
