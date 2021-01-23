import BaseGacha from './base-gacha'
import drops from '../data/wanderlust-invocation.json'

export default class WanderlustInvocation extends BaseGacha {
  constructor() {
    super(drops)
  }
  rollOnce() {
    let rating;
    this.shuffle(this.probabilityRange)
    this.attempts = 1
    const guaranteed5Star = (this.pityCounter5 % this.hardPity5Limit)
    if (guaranteed5Star) {
      return this.getRandomItem(5)
    }
    const guaranteed4Star = (this.pityCounter4 === 10)
    if (guaranteed4Star) {
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
    return this.getRandomItem(5)
  }
  getRandomItem(rating) {
    if (rating === 3) {
      return this.getRandom3StarItem()
    } else if (rating === 4) {
     return this.flipForCharacterOrWeapon(4,this.drops)
    }
     this.reset5StarProbability()
     return this.flipForCharacterOrWeapon(5,this.drops)
  }
  flipForCharacterOrWeapon(rating,itemsList) {
    const coinFlip = this.flipACoin()
    const itemType = coinFlip ? 'character' : 'weapon'
    const result = itemsList.filter(item => item.type === itemType && item.rating === rating)
    return result[this.generateRandomNumber(result.length)]
  }
  getGuaranteed4StarItemOrHigher() {
    // .6% chance of getting 5 star item
    this.pityCounter4 = 0
    const didUserGet5StarItem = this.standardRange[this.generateRandomNumber(this.standardRange.length)]
    if (didUserGet5StarItem === 5) {
      return this.getRandomItem(5)
    }
    return this.getRandomItem(4)
  }
}