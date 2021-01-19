export default class BaseGacha {
  constructor(drops) {
    this.drops = drops
    this.attemptsCount = 0
    this.pityCounter5 = 0
    this.pityCounter4 = 0
    this.softPity = 0
    this.guaranteed5Star = false
    this.guaranteedFeatured4Star = false

  }
  set attempts(amount) {
    this.attemptsCount += amount
    this.pityCounter5 += amount
    this.pityCounter4 += amount
    this.guaranteed5Star = !(this.pityCounter5 % 90)
    if (!this.softPity && this.pityCounter5 >= 75) {
      this.probabilityRange = this.generateProbabilityRange(629, 51, 320)
    }
    this.softPity = (this.pityCounter5 >= 75);

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
      this.resetProbability()
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
  //Subclass implement
  getRandomItem(rating){
  }
  //Subclass implement
  getGuaranteed4StarItemOrHigher(){
  }
  //Subclass implement
  getRandomFeatured4StarItem(){
  }
  rollBasedOffProbability() {
    return this.getRandomItem(this.getRandomRating())
  }
  roll() {
    const roll = []
    for (let i = 0; i < 10; i++) {
      roll.push(this.rollOnce());
    }
    return roll
  }
  rollOnce() {
    let item;
    this.shuffle(this.probabilityRange)
    this.attempts = 1
    if (this.guaranteed5Star) {
      return this.getRandomItem(5)
    }
    const guaranteed4Star = (this.pityCounter4 === 10)
    if (guaranteed4Star) {
      this.pityCounter4 = 0
      this.guaranteed4Star = false
      return this.getGuaranteed4StarItemOrHigher()
    }
    item = this.rollBasedOffProbability()
    if (item.rating === 4) {
      this.pityCounter4 = 0
        const isFeatured4StarCharacter = this.flipACoin()
        if (isFeatured4StarCharacter || this.guaranteedFeatured4Star) {
          this.guaranteedFeatured4Star = false
          return this.getRandomFeatured4StarItem()
        } else {
          this.guaranteedFeatured4Star = true
          return this.getRandomItem(4)
        }
    }
    return item
  }



  shuffle(array) {
    for(let i = 0; i < array.length; i++) {
      var randomNumber = this.generateRandomNumber(array.length)
      var placeHolder = array[i]
      array[i] = array[randomNumber]
      array[randomNumber] = placeHolder
    }
  }
  resetProbability() {
    this.pityCounter5 = 0
    this.softPity = false
    this.probabilityRange = this.generateProbabilityRange(933, 60, 7)
  }

}
