import BaseGacha from './base-gacha'
import drops from '../data/reign-of-serenity.json'

export default class ReignOfSerenity extends BaseGacha {
  constructor() {
    super(drops)
  }
}
