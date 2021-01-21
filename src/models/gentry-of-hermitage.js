import BaseGacha from './base-gacha'
import drops from '../data/gentry-of-hermitage.json'

export default class GentryOfHermitage extends BaseGacha {
  constructor() {
    super(drops)
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating);
    let item;
    if (rating === 5) {
      this.reset5StarProbability()
    }

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
}
