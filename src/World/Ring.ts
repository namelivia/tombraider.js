class Ring {
  radius: number
  separation: number //The angle for the items to be evenly placed

  constructor() {
    this.separation = 0
  }

  getRadius(): number {
    return this.radius
  }

  setRadius(radius: number) {
    this.radius = radius
  }

  getSeparation(): number {
    return this.separation
  }

  setItemsNumber(itemsCount: number) {
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
