import BaseGacha from './base-gacha'
import drops from '../data/farewell-of-snezhnaya.json'

export default class FarewellOfSnezhnaya extends BaseGacha {
  constructor() {
    super(drops)
    this.guaranteedTartaglia = false
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating);
    let item;
    if (rating === 5) {
      this.reset5StarProbability()
    }

    if (this.guaranteedTartaglia && rating === 5) {
      return this.grabATartaglia();
    } else {
      item = itemsList[this.generateRandomNumber(itemsList.length)];
    }

    if (item.rating === 5 && item.name !== 'Tartaglia') {
      this.guaranteedTartaglia = true;
    }

    return item
  }
  getGuaranteed5StarItem() {
    const isTartaglia = this.flipACoin()
    if (this.guaranteedTartaglia || isTartaglia) {
      return this.grabATartaglia()
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
  grabATartaglia() {
    this.guaranteedTartaglia = false
    this.reset5StarProbability()
    return this.drops.find(item => item.name === 'Tartaglia')
  }
}
