import BaseGacha from './base-gacha'
import drops from '../data/secretum-secretorum.json'

export default class SecretumSecretorum extends BaseGacha {
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
    if (this.guaranteedAlbedo && rating === 5) {
      return this.grabAAlbedo();
    } else {
      item = itemsList[this.generateRandomNumber(itemsList.length)];
    }
    if (item.rating === 5 && item.name !== 'Albedo') {
      this.guaranteedAlbedo = true;
    }
    return item
  }
}
