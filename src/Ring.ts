class Ring {

    radius: number
    separation: number

    constructor() {
        this.separation = 0
    }

    getRadius():number {
        return this.radius
    }

    setRadius(radius: number) {
        this.radius = radius
    }

    getSeparation():number {
        return this.separation
    }

    updateSeparation(itemsCount: number) {
        this.separation = (360 / itemsCount) * (Math.PI / 180)
    }

    getItemX(index: number) {
        return Math.cos(this.separation * index) * this.radius
    }

    getItemZ(index: number) {
        return Math.sin(this.separation * index) * this.radius
    }

}

export default Ring
