import Camera from './Camera'
import Ring from './Ring'
class World {
    camera: Camera
    ring: Ring

    initialize() {
        this.camera = new Camera()
        this.ring = new Ring()
        this.ring.setRadius(6000)
        this.camera.setDistance(12000)
        this.camera.setHeight(3000)
    }

    getCameraDistance(): number {
        return this.camera.getDistance()
    }

    getCameraHeight(): number {
        return this.camera.getHeight()
    }

    setCameraHeight(height: number) {
        this.camera.setHeight(height)
    }

    setCameraDistance(distance: number) {
        this.camera.setDistance(distance)
    }

    setRadius(radius: number) {
        this.ring.setRadius(radius)
    }

    getRadius() {
        return this.ring.getRadius()
    }

    setItemsNumber(itemsCount: number) {
        this.ring.setItemsNumber(itemsCount)
    }
}
export default World
