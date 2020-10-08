import BaseGacha from './base-gacha'
import drops from '../data/ballad-in-goblets.json'

export default class BalladInGoblets extends BaseGacha {
  constructor() {
    super(drops)
  }
}
