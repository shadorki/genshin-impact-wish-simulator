import BaseGacha from './base-gacha'
import drops from '../data/farewell-of-snezhnaya-2.json'

export default class FarewellOfSnezhnaya2 extends BaseGacha {
  constructor() {
    super(drops)
  }
}
