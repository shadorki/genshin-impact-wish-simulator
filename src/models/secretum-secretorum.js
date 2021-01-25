import BaseGacha from './base-gacha'
import drops from '../data/secretum-secretorum.json'

export default class SecretumSecretorum extends BaseGacha {
  constructor() {
    super(drops)
  }
}
