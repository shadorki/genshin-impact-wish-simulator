import drops from '../data/ballad-in-goblets.json'

export default class BalladInGoblets {
  constructor() {
    this.drops = drops
    }
    getDrops(rating) {
      if(!rating) {
        return this.drops
      } else {
        return this.drops.filter(drop => drop.rating === rating)
      }
    }
  }
