class Ring {

    radius: int
    separation: int

    constructor() {
        this.separation = 0
    }

    getRadius():int {
        return this.radius
    }

    setRadius(radius: int) {
        this.radius = radius
    }

    getSeparation():int {
        return this.separation
    }

    updateSeparation(itemsCount: int) {
        this.separation = (360 / itemsCount) * (Math.PI / 180)
    }

    getItemX(index: int) {
        return Math.cos(this.separation * index) * this.radius
    }

    getItemZ(index: int) {
        return Math.sin(this.separation * index) * this.radius
    }

}

export default Ring
