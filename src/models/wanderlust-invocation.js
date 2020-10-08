import BaseGacha from './base-gacha'
import drops from '../data/wanderlust-invocation.json'

export default class WanderlustInvocation extends BaseGacha {
  constructor() {
    super(drops)
  }
}
