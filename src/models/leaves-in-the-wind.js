import BaseGacha from './base-gacha'
import drops from '../data/leaves-in-the-wind.json'

export default class LeavesInTheWind extends BaseGacha {
  constructor() {
    super(drops)
  }
}
