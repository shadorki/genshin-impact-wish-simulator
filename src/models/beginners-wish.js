import BaseGacha from './base-gacha'
import drops from '../data/beginners-wish.json'

export default class BeginnersWish extends BaseGacha {
  constructor() {
    super(drops)
  }
}
