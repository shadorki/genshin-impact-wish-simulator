export default class BaseGacha {
  constructor(drops) {
    this.drops = drops
  }
  getDrops(rating) {
    if (!rating) {
      return this.drops
    } else {
      return this.drops.filter(drop => drop.rating === rating)
    }
  }
}
