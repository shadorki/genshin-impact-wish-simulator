import BaseGacha from './base-gacha'
import drops from '../data/ballad-in-goblets.json'
// 5 star item chance 1.6% guaranteed once per 90 attempts
// first time getting 5 star item 50% chance for venti, if not second time 100% venti
// guaranteed to win 4 star item atleast once per 10 roll
// first time winning 4 star item 50% chance for featured character, guaranteed for second time
export default class BalladInGoblets extends BaseGacha {
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

    // If our previous SSR didn't drop a Venti, then this time, we'll get him.
    if (this.guaranteedVenti && rating === 5) {
      return this.grabAVenti();
    } else {
      item = itemsList[this.generateRandomNumber(itemsList.length)];
    }

    // This is a checker to check if our current pull does not contain a Venti.
    if (item.rating === 5 && item.name !== 'Venti') {
      this.guaranteedVenti = true;
    }

    return item
  }
}
