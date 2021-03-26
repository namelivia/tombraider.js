class Camera {
    _angle: int
    distance: int
    height: int

    constructor(): Camera {
        this._angle = 0
        this.distance = 0
        this.height = 0
    }

    setHeight(height: int) {
        this.height = height
    }

    getHeight() {
        return this.height
    }

    setDistance(distance: int) {
        this.distance = distance
    }

    setAngle(angle: int) {
        this._angle = angle
    }

    angle(): int {
        return this._angle
    }

    getX(): int {
        return Math.cos(this._angle) * this.distance
    }

    getY(): int {
        return this.height
    }

    getZ(): int {
        return Math.sin(this._angle) * this.distance
    }
}
export default Camera
