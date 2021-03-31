class Item {
  index: number
  name: string
  action: string
  params: string
  model: string
  //TODO: There is probably some duplication between modelId and index
  modelId: number

  constructor(
    index: number,
    name: string,
    action: string,
    params: string,
    model: string,
    modelId: number,
  ) {
    this.index = index
    this.name = name
    this.action = action
    this.params = params
    this.model = model
    this.modelId = modelId
  }

  getName = (): string => this.name

  serialize = (): {
    name: string
    model: string
    action: string
    params: string
  } => {
    return {
      //index: this.index, TODO: I may need to add the index here
      name: this.name,
      action: this.action,
      params: this.params,
      model: this.model,
    }
  }
}
export default Item
