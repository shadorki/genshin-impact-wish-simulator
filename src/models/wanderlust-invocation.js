import BaseGacha from './base-gacha'
import drops from '../data/wanderlust-invocation.json'

export default class WanderlustInvocation extends BaseGacha {
  constructor() {
    super(drops)
    this.attemptsCount = 0;
    this.guaranteed5Star = false
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating)
    if (rating === 5) {
      this.resetProbability()
    }
    const item = itemsList[this.generateRandomNumber(itemsList.length)]
    return item
  }
  getGuaranteed4StarItemOrHigher() {
    // .6% chance of getting 5 star item
    const didUserGet5StarItem = this.getRandomRating() === 5
    if (didUserGet5StarItem) {
      return this.getRandomItem(5)
    }
    return this.getRandomItem(4)
  }
}
