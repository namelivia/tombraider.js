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

  addMany = (
    items: Array<{
      name: string
      model: string
      action: string
      params: string
    }>,
  ) => {
    items.forEach((item) =>
      //TODO: modelId is missing
      this.add(
        item.name,
        item.model,
        item.action,
        item.params,
        -1, //modelId is missing here
      ),
    )
  }

  serialize = (): Array<{
    name: string
    model: string
    action: string
    params: string
  }> => this.collection.serialize()

  add = (
    name: string,
    model: string,
    action: string,
    params: string,
    modelId: number,
  ) => {
    let newItem = new Item(
      this.collection.count(),
      name,
      model,
      action,
      params,
      modelId,
    )
    this.collection.add(newItem)
    return this.collection.count()
  }

  modelIds = (): Array<number> => {
    return this.collection.modelIds()
  }

  getSelectedName = (): string => {
    if (this.collection.selected()) {
      return this.collection.selected().name
    }
  }

  getSelectedId = (): number => {
    if (this.collection.selected()) {
      return this.collection.selected().modelId
    }
  }

  getSelectedRotate = (): number => this.collection.getSelectedRotate()

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
