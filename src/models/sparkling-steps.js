import BaseGacha from './base-gacha'
import drops from '../data/sparkling-steps.json'

export default class SparklingSteps extends BaseGacha {
  constructor() {
    super(drops)
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
  }
}
