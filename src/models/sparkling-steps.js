import BaseGacha from './base-gacha'
import drops from '../data/sparkling-steps.json'

export default class SparklingSteps extends BaseGacha {
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
}
