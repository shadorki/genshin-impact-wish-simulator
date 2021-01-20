import BaseGacha from './base-gacha'
import drops from '../data/adrift-in-the-harbor.json'

export default class AdriftInTheHarbor extends BaseGacha {
  constructor() {
    super(drops)
    this.guaranteedGanyu = false
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating);
    let item;
    if (rating === 5) {
      this.reset5StarProbability()
    }

    if (this.guaranteedGanyu && rating === 5) {
      return this.grabAGanyu();
    } else {
      item = itemsList[this.generateRandomNumber(itemsList.length)];
    }

    if (item.rating === 5 && item.name !== 'Ganyu') {
      this.guaranteedGanyu = true;
    }

    return item
  }
  getGuaranteed5StarItem() {
    const isGanyu = this.flipACoin()
    if (this.guaranteedGanyu || isGanyu) {
      return this.grabAGanyu()
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
  grabAGanyu() {
    this.guaranteedGanyu = false
    this.reset5StarProbability()
    return this.drops.find(item => item.name === 'Ganyu')
  }
  reset() {
    super.reset()
    this.guaranteedGanyu = false
  }
}
