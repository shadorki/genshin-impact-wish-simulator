export default class BaseGacha {
  constructor(drops) {
    this.drops = drops
    this.pityCounter = 0
  }
  getDrops(rating) {
    if (!rating) {
      return this.drops
    } else {
      return this.drops.filter(drop => drop.rating === rating)
    }
  }
  getRandomRating() {
    return this.probabilityRange[this.generateRandomNumber(this.probabilityRange.length)]
  }
  singlePull() {
    this.shuffle(this.probabilityRange)
    const rating = this.getRandomRating()
    if (rating === 5) {
      this.pityCounter = 0
      this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
    }
    const items = this.getDrops(rating)
    return items[this.generateRandomNumber(items.length)]
  }
  flipACoin() {
    return !!(Math.round(Math.random()))
  }
  generateRandomNumber(max) {
    return Math.floor(Math.random() * max)
  }
  generateRandomNumbers(quantity, max) {
    const randomNumbers = new Set()
    while(quantity) {
      const num = Math.floor(Math.random() * max)
      if(randomNumbers.has(num)) continue;
      randomNumbers.add(num)
      quantity--
    }
    return randomNumbers
  }
  // Takes three arguments for each star rating goes 3 4 5
  generateProbabilityRange(...args) {
    const range = []
    args.forEach((star, i) => range.push(...this.generateProbabilityCount(star, i + 3)))
    this.shuffle(range)
    return range
  }
  generateProbabilityCount(amount, rating) {
    const result = []
    while (amount) {
      result.push(rating)
      amount--
    }
    return result
  }
  shuffle(array) {
    for(let i = 0; i < array.length; i++) {
      var randomNumber = this.generateRandomNumber(array.length)
      var placeHolder = array[i]
      array[i] = array[randomNumber]
      array[randomNumber] = placeHolder
    }
  }
}
