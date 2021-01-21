import BaseGacha from './base-gacha'
import drops from '../data/wanderlust-invocation.json'

export default class WanderlustInvocation extends BaseGacha {
  constructor() {
    super(drops)
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
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
    item = this.rollBasedOffProbability()
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
    const item = itemsList[this.generateRandomNumber(itemsList.length)]
    return item
  }
  getGuaranteed4StarItemOrHigher() {
    // .6% chance of getting 5 star item
    const tempRange = this.probabilityRange
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
    const didUserGet5StarItem = this.getRandomRating() === 5
    this.probabilityRange = tempRange
    if (didUserGet5StarItem) {
      return this.getRandomItem(5)
    }
    return this.getRandomItem(4)
  }
}
