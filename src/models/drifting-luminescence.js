import BaseGacha from './base-gacha'
import drops from '../data/drifting-luminescence.json'

export default class DriftingLuminescence extends BaseGacha {
  constructor() {
    super(drops)
  }
}
