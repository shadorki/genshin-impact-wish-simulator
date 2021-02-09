import BaseGacha from './base-gacha'
import drops from '../data/beginners-wish.json'

export default class BeginnersWish extends BaseGacha {
  constructor(setBeginnersWishDisable = () => {}, setBeginnersWishX10Disable = () => {}) {
    super(drops)
    this.guaranteedNoelle = true
    this.setBeginnersWishDisable = setBeginnersWishDisable
    this.setBeginnersWishX10Disable = setBeginnersWishX10Disable
  }
  set attempts(amount) {
    this.attemptsCount += amount
    if(this.attemptsCount >= 20) {
      this.setBeginnersWishDisable(true)
    }
    if(this.attemptsCount > 10) {
      this.setBeginnersWishX10Disable()
    }
  }
  roll() {
    // Beginners wish is limited to 20 rolls
    if(this.attemptsCount > 10) {
      console.error('Exceed beginners wish limit')
      return null;
    }
    const roll = []
    this.shuffle(this.probabilityRange)
    this.attempts = 10
    if (this.guaranteedNoelle) {
      roll.push(this.grabANoelle())
      this.guaranteedNoelle = false
    } else {
      roll.push(this.getGuaranteed4StarItemOrHigher())
    }
    // 4 star item or higher guaranteed every 10 rolls

    const rollsToGo = 10 - roll.length

    for (let i = 0; i < rollsToGo; i++) {
      roll.push(this.getRandomItem(this.getRandomRating()))
    }
    return roll
  }
  rollOnce() {
    if (this.attemptsCount >= 20) {
      console.error('Exceed beginners wish limit')
      return null;
    }
    this.attempts = 1
    return this.singlePull()
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating)
    const item = itemsList[this.generateRandomNumber(itemsList.length)]
    return item
  }
  getGuaranteed4StarItemOrHigher() {
    // .5% chance of getting 5 star item
    const didUserGet5StarItem = this.getRandomRating() === 5
    if (didUserGet5StarItem) {
      return this.getRandomItem(5)
    }
      return this.getRandomItem(4)
  }
  grabANoelle() {
    return {
      name: "Noelle",
      element: "Geo",
      type: "character",
      rating: 4,
      src: "Noelle.png"
    }
  }
  reset(){
    super.reset()
    this.guaranteedNoelle = true
  }
  singlePull() {
    this.shuffle(this.probabilityRange)
    const rating = this.getRandomRating()
    if (rating === 5) {
      this.reset5StarProbability()
    }
    const items = this.getDrops(rating)
    return items[this.generateRandomNumber(items.length)]
  }
}
