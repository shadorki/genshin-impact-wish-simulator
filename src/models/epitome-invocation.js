import BaseGacha from './base-gacha'
import drops from '../data/epitome-invocation.json'

export default class EpitomeInvocation extends BaseGacha {
  constructor() {
    super(drops)
    this.guaranteedFeatured5Star = false
    this.standardRange = this.generateProbabilityRange(933, 60, 7)
    this.standardSoftPityRange = this.generateProbabilityRange(620, 60, 320)
    this.probabilityRange = this.standardRange
    // need a range for the 75% chance
    // 5 is featured
    // 4 is not featured
    this.chanceRange = this.generateProbabilityRange(0, 25, 75)
  }
  set attempts(amount) {
    this.pityCounter5 += amount
    this.pityCounter4 += amount
    this.attemptsCount += amount
    this.guaranteed5Star = !(this.pityCounter5 % 80)
    if (!this.softPity && this.pityCounter5 >= 65) {
      this.probabilityRange = this.standardSoftPityRange
    }
    this.softPity = (this.pityCounter5 >= 65);
  }
  beforeRollOnce() {
    this.shuffle(this.chanceRange)
  }
 getRandom4StarItem() {
   const isFeatured4StarCharacter = this.chanceRange[this.generateRandomNumber(100)] === 5
   if (isFeatured4StarCharacter || this.guaranteedFeatured4Star) {
     this.guaranteedFeatured4Star = false
     return this.getItem(4,true)
   } else {
     this.guaranteedFeatured4Star = true
     return this.getItem(4,undefined)
   }
 }
 getGuaranteed5StarItem() {
   const isFeatured5Star = this.chanceRange[this.generateRandomNumber(100)] === 5
   if (this.guaranteedFeatured5Star || isFeatured5Star) {
     this.guaranteedFeatured5Star = false
     return this.getItem(5,true)
   }
   this.guaranteedFeatured5Star = true
   return this.getItem(5,undefined)
 }
}
