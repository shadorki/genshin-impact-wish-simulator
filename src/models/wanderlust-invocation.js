import BaseGacha from './base-gacha'
import drops from '../data/wanderlust-invocation.json'

export default class WanderlustInvocation extends BaseGacha {
  constructor() {
    super(drops)
  }
  flipForCharacterOrWeapon(rating,itemsList) {
    const coinFlip = this.flipACoin()
    if (coinFlip) {
      const result = itemsList.filter(item => item.type === 'character' && item.rating === rating)
      return result[this.generateRandomNumber(result.length)]
    } else {
      const result = itemsList.filter(item => item.type === 'weapon' && item.rating === rating)
      return result[this.generateRandomNumber(result.length)]
    }
  }
  rollOnce() {
    let rating;
    this.shuffle(this.probabilityRange)
    this.attempts = 1
    if (this.guaranteed5Star) {
      this.reset5StarProbability()
      return this.getRandomItem(5)
    }
    const guaranteed4Star = (this.pityCounter4 === 10)
    if (guaranteed4Star) {
      this.guaranteed4Star = false
      return this.getGuaranteed4StarItemOrHigher()
    }
    rating = this.getRandomRating()
    if (rating === 3) {
      return this.getRandomItem(3)
    }
    if (rating === 4) {
      this.pityCounter4 = 0
      return this.getRandomItem(4)
    }
    this.reset5StarProbability()
    return this.getRandomItem(5)
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating)

    if (rating === 3) {
     const result = itemsList.filter(item => item.rating === 3)
      return result[this.generateRandomNumber(result.length)]
    } else if (rating === 4) {
     return this.flipForCharacterOrWeapon(4,itemsList)
    }
     return this.flipForCharacterOrWeapon(5,itemsList)
  }
  getGuaranteed4StarItemOrHigher() {
    // .6% chance of getting 5 star item
    const didUserGet5StarItem = this.standardRange[this.generateRandomNumber(this.standardRange.length)]
    if (didUserGet5StarItem === 5) {
      return this.getRandomItem(5)
    }
    this.pityCounter4 = 0
    return this.getRandomItem(4)
  }
}