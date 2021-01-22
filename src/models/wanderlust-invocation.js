import BaseGacha from './base-gacha'
import drops from '../data/wanderlust-invocation.json'

export default class WanderlustInvocation extends BaseGacha {
  constructor() {
    super(drops)
  }
  rollOnce() {
    let item;
    this.shuffle(this.probabilityRange)
    this.attempts = 1
    if (this.guaranteed5Star) {
      return this.getRandomItem(5)
    }
    const guaranteed4Star = (this.pityCounter4 === 10)
    if (guaranteed4Star) {
      this.pityCounter4 = 0
      this.guaranteed4Star = false
      return this.getGuaranteed4StarItemOrHigher()
    }
    item = this.getRandomItem(this.getRandomRating())
    if (item.rating === 4) {
      this.pityCounter4 = 0
    }
    return item
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating)
    if (rating === 5) {
      this.reset5StarProbability()
    }
    return itemsList[this.generateRandomNumber(itemsList.length)]
  }
  getGuaranteed4StarItemOrHigher() {
    // .6% chance of getting 5 star item
    const didUserGet5StarItem = this.standardRange[this.generateRandomNumber(this.standardRange.length)]
    if (didUserGet5StarItem === 5) {
      return this.getRandomItem(5)
    }
    return this.getRandomItem(4)
  }
}