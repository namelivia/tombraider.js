import World from './World'

class Api {

    world: World
    constructor() {
        //TODO: I'm not very sure about this...
        this.world = new World()
        this.world.initialize()
    }

    getCameraDistance(): number {
        return this.world.getCameraDistance()
    }

    getCameraHeight(): number {
        return this.world.getCameraHeight()
    }

    setCameraDistance(distance: number) {
        return this.world.setCameraDistance(distance)
    }

    setCameraHeight(height: number) {
        return this.world.setCameraHeight(height)
    }

    setRadius(radius: number) {
        return this.world.setRadius(radius)
    }

    getRadius(): number {
        return this.world.getRadius()
    }

    setItemsNumber(itemsCount: number) {
        return this.world.setItemsNumber(itemsCount)
    }
}

export default Api
