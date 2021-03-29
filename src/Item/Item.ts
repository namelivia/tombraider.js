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

  getName = (): string => this.name

  serialize = (): {name: string, model: string, action:string, params: string} => {
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
