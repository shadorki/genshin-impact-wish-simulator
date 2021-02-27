import BaseGacha from './base-gacha'
import drops from '../data/dance-of-lanterns.json'

export default class DanceOfLanterns extends BaseGacha {
  constructor() {
    super(drops)
  }
}
