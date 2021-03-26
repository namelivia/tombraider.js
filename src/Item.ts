class Item {

    name: string
    action: string
    params: string
    model: string

    constructor(name: string, action: string, params: string, model: string) {
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
            "name": this.name,
            "action": this.action,
            "params": this.params,
            "model": this.model,
        }
    }
}
export default Item
