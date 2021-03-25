class Config {

    radius: int
    distance: int
    height: int

    constructor(radius:int , distance:int , height:int) {
        this.radius = radius
        this.distance = distance
        this.height = height
    }

    validate() {
        if (isNaN(this.radius)) {
            throw 'Invalid configuration: invalid radius'
        }
        if (isNaN(this.distance)) {
            throw 'Invalid configuration: invalid distance'
        }
        if (isNaN(this.height)) {
            throw 'Invalid configuration: invalid height'
        }
    }

    save():string {
        return JSON.stringify({
            'radius': this.radius,
            'distance': this.distance,
            'height': this.height
        })
    }
}
export default Config
