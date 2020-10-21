import BaseGacha from './base-gacha'
import drops from '../data/sparkling-steps.json'

export default class SparklingSteps extends BaseGacha {
  constructor() {
    super(drops)
    this.attemptsCount = 0;
    this.guaranteedFeatured4Star = false
    this.guaranteed5Star = false
    this.guaranteedKlee = false
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

    // If our previous SSR didn't drop a Klee, then this time, we'll get her.
    if (this.guaranteedKlee && rating === 5) {
      return this.grabAKlee();
    } else {
      item = itemsList[this.generateRandomNumber(itemsList.length)];
    }

    // This is a checker to check if our current pull does not contain a Klee.
    if (item.rating === 5 && item.name !== 'Klee') {
      this.guaranteedKlee = true;
    }

    return item
  }
  getGuaranteed5StarItem() {
    const isKlee = this.flipACoin()
    if (this.guaranteedKlee || isKlee) {
      return this.grabAKlee()
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
  grabAKlee() {
    this.guaranteedKlee = false
    return this.drops.find(item => item.name === 'Klee')
  }
}
