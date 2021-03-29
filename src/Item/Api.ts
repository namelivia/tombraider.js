import ItemsCollection from './ItemsCollection'
import Item from './Item'

class Api {

    collection: ItemsCollection

    constructor() {
        this.collection = new ItemsCollection()
    }

    selectNext = () => {
        this.collection.select(1)
    }

    selectPrevious = () => {
        this.collection.select(-1)
    }

    addMany = (items: Array<{name: string, model: string, action:string, params: string}>) => {
        items.forEach((item) => this.add(item.name, item.model, item.action, item.params))
    }

    serialize = ():Array<{name: string, model: string, action:string, params: string}> => this.collection.serialize()

    add = (name: string, model: string, action: string, params: string) => {
        let newItem = new Item(this.collection.count(), name, model, action, params)
        this.collection.add(newItem)

        //TODO: Think about the communication here, maybe return
        //Now the ring needs to update
        //this.world.setItemsNumber(this.items.count())
    }

    getSelectedName = (): string => {
        if (this.collection.selected()) {
          return this.collection.selected().name
        }
    }

    deleteSelected = () => {
        let selectedObject = this.collection.selected()
        this.collection.remove(selectedObject)
        if (!this.collection.empty()) {
          this.selectPrevious()
        }
        //TODO: Think about the communication here, maybe return
        //this.scene.removeModel(this.items.selected().index)
    }
}

export default Api
