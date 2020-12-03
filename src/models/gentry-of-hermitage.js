import BaseGacha from './base-gacha'
import drops from '../data/gentry-of-hermitage.json'

export default class GentryOfHermitage extends BaseGacha {
  constructor() {
    super(drops)
    this.attemptsCount = 0;
    this.guaranteedFeatured4Star = false
    this.guaranteed5Star = false
    this.guaranteedZhongli = false
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
  set attempts(amount) {
    this.attemptsCount += amount
    this.guaranteed5Star = !(this.attemptsCount % 90)
  }
  roll() {
    const roll = []
    this.shuffle(this.probabilityRange)
    this.attempts = 10
    // checks to see if 90 attempts have passed, and grabs 5 star item
    if (this.guaranteed5Star) {
      roll.push(this.getGuaranteed5StarItem())
    }
    // 4 star item or higher guaranteed every 10 rolls
    roll.push(this.getGuaranteed4StarItemOrHigher())

    const rollsToGo = 10 - roll.length

    for (let i = 0; i < rollsToGo; i++) {
      roll.push(this.rollBasedOffProbability())
    }
    return roll
  }
  rollBasedOffProbability() {
    return this.getRandomItem(this.getRandomRating())
  }
  getRandomRating() {
    return this.probabilityRange[this.generateRandomNumber(this.probabilityRange.length)]
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating);
    let item;

    if (this.guaranteedZhongli && rating === 5) {
      return this.grabAZhongli();
    } else {
      item = itemsList[this.generateRandomNumber(itemsList.length)];
    }

    if (item.rating === 5 && item.name !== 'Zhongli') {
      this.guaranteedZhongli = true;
    }

    return item
  }
  getGuaranteed5StarItem() {
    const isZhongli = this.flipACoin()
    if (this.guaranteedZhongli || isZhongli) {
      return this.grabAZhongli()
    }
    return this.getRandomItem(5)
  }
  getGuaranteed4StarItemOrHigher() {
    // .5% chance of getting 5 star item
    const itemRating = this.getRandomRating()
    const didUserGet5StarItem = itemRating === 5
    if (didUserGet5StarItem) {
      return this.getRandomItem(5)
    }
    const isFeatured4StarCharacter = this.flipACoin()
    if (isFeatured4StarCharacter || this.guaranteedFeatured4Star) {
      this.guaranteedFeatured4Star = false
      return this.getRandomFeatured4StarItem()
    } else {
      this.guaranteedFeatured4Star = true
      return this.getRandomItem(4)
    }

  }
  getRandomFeatured4StarItem() {
    const items = this.getDrops(4)
    const featuredItems = items.filter(item => item.rating === 4 && item.isFeatured === true)
    return featuredItems[this.generateRandomNumber(featuredItems.length)]
  }
  grabAZhongli() {
    this.guaranteedZhongli = false
    return this.drops.find(item => item.name === 'Zhongli')
  }
}
