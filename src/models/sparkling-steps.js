import BaseGacha from './base-gacha'
import drops from '../data/sparkling-steps.json'

export default class SparklingSteps extends BaseGacha {
  constructor() {
    super(drops)
    this.guaranteedKlee = false
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating);
    let item;
    if (rating === 5) {
      this.reset5StarProbability()
    }
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
    this.reset5StarProbability()
    return this.drops.find(item => item.name === 'Klee')
  }
}
