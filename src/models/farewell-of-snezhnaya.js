import BaseGacha from './base-gacha'
import drops from '../data/farewell-of-snezhnaya.json'

export default class FarewellOfSnezhnaya extends BaseGacha {
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
}
