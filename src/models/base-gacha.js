export default class BaseGacha {
  constructor(drops) {
    this.drops = drops
    this.attemptsCount = 0
    this.pityCounter5 = 0
    this.pityCounter4 = 0
    this.softPity = 0
    this.guaranteed5Star = false
    this.guaranteedFeatured4Star = false
    this.guaranteedFeatured5Star = false
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
      this.reset5StarProbability()
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
  getRandom3StarItem() {
    const threeStarItems = this.getDrops(3)
    return threeStarItems[this.generateRandomNumber(threeStarItems.length)]
  }
  getRandom4StarItem() {
    const isFeatured4StarCharacter = this.flipACoin()
    if (isFeatured4StarCharacter || this.guaranteedFeatured4Star) {
      this.guaranteedFeatured4Star = false
      return this.getRandomFeatured4StarItem()
    } else {
      this.guaranteedFeatured4Star = true
      return this.getRandomNonfeatured4StarItem()
    }
  }
  getRandomFeatured4StarItem() {
    const items = this.getDrops(4)
    const featuredItems = items.filter(item => item.rating === 4 && item.isFeatured === true)
    return featuredItems[this.generateRandomNumber(featuredItems.length)]
  }
  getRandomNonfeatured4StarItem() {
    const items = this.getDrops(4)
    const nonfeaturedItems = items.filter(item => item.isFeatured)
    return nonfeaturedItems[this.generateRandomNumber(nonfeaturedItems.length)]
  }
  getGuaranteed4StarItemOrHigher() {
    // .6% chance of getting 5 star item
    const tempRange = this.probabilityRange
    this.probabilityRange = this.generateProbabilityRange(943, 51, 6)
    const itemRating = this.getRandomRating()
    this.probabilityRange = tempRange
    const didUserGet5StarItem = itemRating === 5
    if (didUserGet5StarItem) {
      return this.getGuaranteed5StarItem()
    }
  return this.getRandom4StarItem()
  }
  getGuaranteed5StarItem() {
    const isFeatured5Star = this.flipACoin()
    if (this.guaranteedFeatured5Star || isFeatured5Star) {
      this.guaranteedFeatured5Star = false
      return this.getRandomFeatured5Star()
    }
    this.guaranteedFeatured5Star = true
    return this.getRandomNonfeatured5Star()
  }
  getRandomFeatured5Star() {
    const items = this.getDrops(5)
    const featuredItems =  items.filter(item => item.rating === 5 && item.isFeatured === true)
    return featuredItems[this.generateRandomNumber(featuredItems.length)]
  }
  getRandomNonfeatured5Star() {
    const items = this.getDrops(5)
    const nonfeaturedItems =  items.filter(item => item.rating === 5 && item.isFeatured)
    return nonfeaturedItems[this.generateRandomNumber(nonfeaturedItems.length)]
  }
  getRandomItem(rating) {
    const itemsList = this.getDrops(rating);
    let item;
    if (rating === 5) {
      this.reset5StarProbability()
    }

    if (this.guaranteedFeatured5Star && rating === 5) {
      return this.getRandomFeatured5Star();
    } else {
      item = itemsList[this.generateRandomNumber(itemsList.length)];
    }

    if (item.rating === 5 && item.isFeatured === true) {
      this.guaranteedFeatured5Star = true;
    }
    return item
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
    let rating;
    this.shuffle(this.probabilityRange)
    this.attempts = 1
    if (this.guaranteed5Star) {
      this.reset5StarProbability()
      return this.getGuaranteed5StarItem()

    }
    const guaranteed4Star = (this.pityCounter4 === 10)
    if (guaranteed4Star) {
      this.pityCounter4 = 0
      this.guaranteed4Star = false
      return this.getGuaranteed4StarItemOrHigher()
    }
    rating = this.getRandomRating()
    if (rating === 3) {
      return this.getRandom3StarItem()

    } else if (rating === 4) {
      this.pityCounter4 = 0
      return this.getRandom4StarItem()
    }
    this.reset5StarProbability()
    return this.getGuaranteed5StarItem()

  }
  shuffle(array) {
    for(let i = 0; i < array.length; i++) {
      var randomNumber = this.generateRandomNumber(array.length)
      var placeHolder = array[i]
      array[i] = array[randomNumber]
      array[randomNumber] = placeHolder
    }
  }
  reset(){
    this.reset5StarProbability()
    this.guaranteedFeatured5Star = false
    this.guaranteedFeatured4Star = false
    this.pityCounter4 = 0
    this.attemptsCount = 0
  }
  reset5StarProbability() {
    this.pityCounter5 = 0
    this.softPity = false
    this.probabilityRange = this.generateProbabilityRange(933, 60, 7)
  }
}
