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
}
