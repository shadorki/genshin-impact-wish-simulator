import BaseGacha from './base-gacha'
import drops from '../data/epitome-invocation.json'

export default class EpitomeInvocation extends BaseGacha {
  constructor() {
    super(drops)
    this.guaranteedFeatured5Star = false
    this.probabilityRange = this.generateProbabilityRange(933, 60, 7)
    // need a range for the 75% chance
    // 5 is featured
    // 4 is not featured
    this.chanceRange = this.generateProbabilityRange(0, 25, 75)
  }
  set attempts(amount) {
    this.pityCounter5 += amount
    this.pityCounter4 += amount
    this.attemptsCount += amount
    this.guaranteed5Star = !(this.pityCounter5 % 80)
    if (!this.softPity && this.pityCounter5 >= 65) {
      this.probabilityRange = this.generateProbabilityRange(620, 60, 320)
    }
    this.softPity = (this.pityCounter5 >= 65);
  }
  roll() {
    const roll = []
    for (let i = 0; i < 10; i++) {
      roll.push(this.rollOnce());
    }
    return roll
  }
  rollOnce() {
    let item;
    this.attempts = 1
    this.shuffle(this.probabilityRange)
    this.shuffle(this.chanceRange)
    if(this.guaranteed5Star) {
      return this.getGuaranteed5StarItem()
    }
    const guaranteed4Star = (this.pityCounter4 === 10)
    if(guaranteed4Star) {
      this.pityCounter4 = 0
      return this.getGuaranteed4StarItemOrHigher()
    }
    item = this.rollBasedOffProbability()
    if (item.rating === 4) {
      this.pityCounter4 = 0;
    }
    return item
  }
  getRandomItem(rating) {
    if (rating === 5) {
      this.reset5StarProbability()
    }
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
    if(rating === 5) {
      this.reset5StarProbability()
    }
    const featuredItems = items.filter(item => item.rating === rating && item.isFeatured === true)
    return featuredItems[this.generateRandomNumber(featuredItems.length)]
  }
  reset5StarProbability() {
    this.pityCounter5 = 0
    this.softPity = false
    this.probabilityRange = this.generateProbabilityRange(933, 60, 7)
  }
  reset(){
    super.reset()
    this.guaranteedFeatured5Star = false
  }
}
