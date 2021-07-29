import BaseGacha from './base-gacha'
import drops from '../data/the-herons-court.json'

export default class TheHeronsCourt extends BaseGacha {
  constructor() {
    super(drops)
  }
}
