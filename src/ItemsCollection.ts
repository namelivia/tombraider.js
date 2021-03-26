import Item from './Item'
class ItemsCollection {

    items: Array<Item>
    _selected: int

    constructor() {
        this.items = []
        this._selected = 0
    }

    empty(): boolean {
        return this.items.length === 0
    }

    count(): int {
        return this.items.length
    }

    selected(): Item {
        return this.items[this._selected]
    }

    add(item: Item) {
        this._selected = this.items.push(item) - 1
    }

    remove(item: Item) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    serialize(): any {
        return this.items.map(function (item) { return item.serialize() })
    }
}
export default ItemsCollection
