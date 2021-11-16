import BaseGacha from './base-gacha'
import drops from '../data/moment-of-bloom-2.json'

export default class MomentOfBloom2 extends BaseGacha {
  constructor() {
    super(drops)
  }
}
