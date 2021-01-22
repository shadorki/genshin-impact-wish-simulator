import BaseGacha from './base-gacha'
import drops from '../data/gentry-of-hermitage.json'

export default class GentryOfHermitage extends BaseGacha {
  constructor() {
    super(drops)
  }
}
