class Item {
  index: number
  name: string
  action: string
  params: string
  model: string

  constructor(
    index: number,
    name: string,
    action: string,
    params: string,
    model: string,
  ) {
    this.index = index
    this.name = name
    this.action = action
    this.params = params
    this.model = model
  }

  getName(): string {
    return this.name
  }

  serialize(): any {
    return {
      index: this.index,
      name: this.name,
      action: this.action,
      params: this.params,
      model: this.model,
    }
  }
}
export default Item
