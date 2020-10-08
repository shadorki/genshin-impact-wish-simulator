import BaseGacha from './base-gacha'
import drops from '../data/epitome-invocation.json'

export default class EpitomeInvocation extends BaseGacha {
  constructor() {
    super(drops)
  }
}
