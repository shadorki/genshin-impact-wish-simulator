import BaseGacha from './base-gacha'
import drops from '../data/moment-of-bloom.json'

export default class MomentOfBloom extends BaseGacha {
  constructor() {
    super(drops)
  }
}
