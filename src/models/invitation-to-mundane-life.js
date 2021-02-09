import BaseGacha from './base-gacha'
import drops from '../data/invitation-to-mundane-life.json'

export default class InvitationToMundaneLife extends BaseGacha {
  constructor() {
    super(drops)
  }
}
