import BaseGacha from './base-gacha'
import drops from '../data/tapestry-of-golden-flames.json'

export default class TapestryOfGoldenFlames extends BaseGacha {
  constructor() {
    super(drops)
  }
}
