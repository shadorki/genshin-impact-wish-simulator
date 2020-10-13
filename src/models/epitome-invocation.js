import BaseGacha from './base-gacha'
import drops from '../data/epitome-invocation.json'

export default class EpitomeInvocation extends BaseGacha {
  constructor() {
    super(drops)
    this.attemptsCount = 0;
    this.guaranteedFeatured4Star = false
    this.guaranteedFeatured5Star = false
    this.guaranteed5Star = false
    this.probabilityRange = this.generateProbabilityRange(933, 60, 7)
    // need a range for the 75% chance
    // 5 is featured
    // 4 is not featured
    this.chanceRange = this.generateProbabilityRange(0, 25, 75)
  }
  set attempts(amount) {
    this.attemptsCount += amount
    this.guaranteed5Star = !(this.attemptsCount % 80)
  }
  roll() {
    const roll = []
    this.shuffle(this.probabilityRange)
    this.shuffle(this.chanceRange)
    this.attempts = 10
    // checks to see if 80 attempts have passed, and grabs 5 star item
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
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating)
    const item = itemsList[this.generateRandomNumber(itemsList.length)]
    return item
  }
  getGuaranteed5StarItem() {
    const didUserGetFeaturedItem = this.chanceRange[this.generateRandomNumber(100)] === 5
    if (this.guaranteedFeatured5Star || didUserGetFeaturedItem) {
      this.guaranteedFeatured5Star = false
      return this.getRandomFeaturedItem(5)
    }
    this.guaranteedFeatured5Star = true
    return this.getRandomItem(5)
  }
  getRandomRating() {
    return this.probabilityRange[this.generateRandomNumber(this.probabilityRange.length)]
  }
  getGuaranteed4StarItemOrHigher() {
    // check if user got featuredItem
    // there are 75 5s in there, so if it is 5 its true if 4 false
    // I could've generated 75 random numbers, but the odds of that loop taking too long is too high
    // because 75 random numbers out of 100 every time can be dependent on random odds
    const didUserGetFeaturedItem = this.chanceRange[this.generateRandomNumber(100)] === 5
    // shuffle the range of
    // .5% chance of getting 5 star item
    const didUserGet5StarItem = this.getRandomRating() === 5

    if(this.guaranteedFeatured5Star && didUserGet5StarItem) {
      this.guaranteedFeatured5Star = false
      return this.getRandomFeaturedItem(5)
    }
    if(this.guaranteedFeatured4Star) {
      this.guaranteedFeatured4Star = false
      return this.getRandomFeaturedItem(4)
    }
    if (didUserGet5StarItem && didUserGetFeaturedItem || this.guaranteedFeatured5Star) {
      return this.getRandomFeaturedItem(5)
    } else if(!didUserGet5StarItem && didUserGetFeaturedItem) {
      return this.getRandomFeaturedItem(4)
    } else if(didUserGet5StarItem && !didUserGetFeaturedItem) {
      this.guaranteedFeatured5Star = true
      return this.getRandomItem(5)
    } else {
      this.guaranteedFeatured4Star = true
      return this.getRandomItem(4)
    }
  }
  getRandomFeaturedItem(rating) {
    const items = this.getDrops(rating)
    const featuredItems = items.filter(item => item.rating === rating && item.isFeatured === true)
    return featuredItems[this.generateRandomNumber(featuredItems.length)]
  }
}
