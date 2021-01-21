import BaseGacha from './base-gacha'
import drops from '../data/adrift-in-the-harbor.json'

export default class AdriftInTheHarbor extends BaseGacha {
  constructor() {
    super(drops)
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
}
