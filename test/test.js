const chai = require('chai')
const fs = require('fs')
const util = require('util')
const p = require('path');
const readdir = util.promisify(fs.readdir);
const { expect } = chai
import BeginnersWish from '../src/models/beginners-wish'
import EpitomeInvocation from '../src/models/epitome-invocation'
import WanderlustInvocation from '../src/models/wanderlust-invocation'
import FarewellOfSnezhnaya from '../src/models/farewell-of-snezhnaya'
let farewell = null
let beginners = null
let epitome = null
let wanderlust = null

describe('Validate that all data has valid images', () => {
  it('should have an image for each item', async () => {
      try {
        let farewell = require('../src/data/farewell-of-snezhnaya.json')
        let wanderlust = require('../src/data/wanderlust-invocation.json')
        let epitome = require('../src/data/epitome-invocation.json')
        const weaponPix = await readdir(p.join(__dirname, '../src/assets/images/weapons'))
        const characterPix = await readdir(p.join(__dirname, '../src/assets/images/characters'))
        const pics = [...weaponPix, ...characterPix]
        const arrs = [farewell, wanderlust, epitome]
        const missingImages = []
        arrs.forEach((arr, i) => {
          arr.forEach(item => {
            if (!pics.some(pic => pic === item.src)) {
              missingImages.push({
                name: item.name,
                i
              })
            }
          })
        })
        if(missingImages.length) {
          throw missingImages
        }
      } catch(err) {
        expect.fail(`There are some missing images, here is the data ${JSON.stringify(err)}`)
      }
  })
})

describe('Testing suite for genshin impact gacha', () => {
  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////Testing Farewell Of Snezhnaya//////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  describe('Farewell Of Snezhnaya', () => {
    it('should return an instance of Farewell Of Snezhnaya', done => {
      farewell = new FarewellOfSnezhnaya()
      expect(farewell instanceof FarewellOfSnezhnaya).to.be.true
      done()
    })
    it('should have a 4 or 5 star item', done => {
      const results = farewell.roll()
      const item = results.find(item => item.rating === 4 || item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 10 attempts', done => {
      expect(farewell.attemptsCount).to.be.equal(10)
      done()
    })
    it('should give us a total of 10 items', done => {
      const results = farewell.roll()
      expect(results.length === 10).to.be.true
      done()
    })
    it('should have a guaranteed 5 star item', done => {
      for(let i = 0; i < 6; i++) {
        farewell.roll()
      }
      const results = farewell.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 90 attempts', done => {
      expect(farewell.attemptsCount).to.be.equal(90)
      done()
    })
    it('should have another guaranteed 5 star item', done => {
      for (let i = 0; i < 8; i++) {
        farewell.roll()
      }
      const results = farewell.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 180 attempts', done => {
      expect(farewell.attemptsCount).to.be.equal(180)
      done()
    })
    it('should have guaranteed Tartaglia', done => {
      // Initialize required variables.
      const results = [];
      const farewellTartaglia = new FarewellOfSnezhnaya();
      const guaranteedGachaLimit = 18;
      let hasTartaglia = false;

      // Logically, we'll get Tartaglia after 180 pulls (guaranteed SSR every 90 pulls, then the next one will be Tartaglia).
      // Henceforth, it is the maximum pull.
      for (let i = 0; i < guaranteedGachaLimit; i++) {
        results.push(farewellTartaglia.roll());

        // Then, if we get Tartaglia in less than 180 pulls, set 'hasTartaglia' to true and exit the loop.
        if (results[i].find(item => item.rating === 5 && item.name === 'Tartaglia')) {
          hasTartaglia = true;
          break;
        }
      }

      expect(hasTartaglia).to.be.true;
      done();
    })
    it('should give a Tartaglia after pulling an SSR that is not Tartaglia (first Tartaglia pull is also acceptable)', done => {
      const results = [];
      const farewellTartaglia = new FarewellOfSnezhnaya();
      let hasTartaglia = false;
      let hasSSR = false;

      // Infinite loop, we want to keep pulling until we discovered a Tartaglia.
      while (true) {
        const roll = farewellTartaglia.roll();
        results.push(roll);

        // Filter all the results by its five star.
        // If there are any results, store its name in a new array for easier checking.
        const filteredResults = roll.filter(item => item.rating === 5);
        const names = filteredResults.map(e => e.name);
        const areNamesFilled = names.length > 0;

        // This step will fail if the second SSR is not Tartaglia.
        // We'll also have to check if we pulled any SSR, hence the 'names.length' to prevent false negatives.
        if (hasSSR && !names.includes('Tartaglia') && areNamesFilled) {
          expect.fail('The second SSR pulled was not Tartaglia!');
        }

        // If the first SSR is not Tartaglia, set 'hasSSR' to true.
        if (!names.includes('Tartaglia') && areNamesFilled) {
          hasSSR = true;
        }

        // The next SSR, we have to check if it is truly Tartaglia.
        if (hasSSR && names.includes('Tartaglia') && areNamesFilled) {
          hasTartaglia = true;
          break;
        }

        // If the SSR is Tartaglia, then exit.
        if (names.includes('Tartaglia') && areNamesFilled) {
          hasTartaglia = true;
          break;
        }
      }

      expect(hasTartaglia).to.be.true;
      done();
    })
  })

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////Beginners Wish////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  describe('Beginners Wish', () => {
    let firstResult = null
    let secondResult = null
    it('should return an instance of Beginners Wish', done => {
      beginners = new BeginnersWish()
      expect(beginners instanceof BeginnersWish).to.be.true
      done()
    })
    it('should give us Noelle as the first item', done => {
      firstResult = beginners.roll()
      const [item] = firstResult
      expect(item.name).to.be.equal('Noelle')
      done()
    })
    it('should give us 10 items', done => {
      expect(firstResult.length).to.be.equal(10)
      done()
    })
    it('should have counted 10 attempts', done => {
      expect(beginners.attemptsCount).to.be.equal(10)
      done()
    })
    it('should have a 4 or 5 star item on the second roll', done => {
      secondResult = beginners.roll()
      const item = secondResult.find(item => item.rating === 4 || item.rating === 5)
      expect(item.rating === 4 || item.rating === 5).to.be.true
      done()
    })
    it('should return null for the third roll', done => {
      const thirdResult = beginners.roll()
      expect(thirdResult).to.not.exist
      done()
    })
  })
  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////Testing Epitome Invocation/////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  describe('Epitome Invocation', () => {
    it('should return an instance of Epitome Invocation', done => {
      epitome = new EpitomeInvocation()
      expect(epitome instanceof EpitomeInvocation).to.be.true
      done()
    })
    it('should have a 4 or 5 star item', done => {
      const results = epitome.roll()
      const item = results.find(item => item.rating === 4 || item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 10 attempts', done => {
      expect(epitome.attemptsCount).to.be.equal(10)
      done()
    })
    it('should give us a total of 10 items', done => {
      const results = epitome.roll()
      expect(results.length === 10).to.be.true
      done()
    })
    it('should have a guaranteed 5 star item', done => {
      for (let i = 0; i < 5; i++) {
        epitome.roll()
      }
      const results = epitome.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 80 attempts', done => {
      expect(epitome.attemptsCount).to.be.equal(80)
      done()
    })
    it('should have another guaranteed 5 star item', done => {
      for (let i = 0; i < 7; i++) {
        epitome.roll()
      }
      const results = epitome.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 160 attempts', done => {
      expect(epitome.attemptsCount).to.be.equal(160)
      done()
    })
  })
  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////Testing Wanderlust Invocation//////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  describe('Wanderlust Invocation', () => {
    it('should return an instance of Wanderlust Invocation', done => {
      wanderlust = new WanderlustInvocation()
      expect(wanderlust instanceof WanderlustInvocation).to.be.true
      done()
    })
    it('should have a 4 or 5 star item', done => {
      const results = wanderlust.roll()
      const item = results.find(item => item.rating === 4 || item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 10 attempts', done => {
      expect(wanderlust.attemptsCount).to.be.equal(10)
      done()
    })
    it('should give us a total of 10 items', done => {
      const results = wanderlust.roll()
      expect(results.length === 10).to.be.true
      done()
    })
    it('should have a guaranteed 5 star item', done => {
      for (let i = 0; i < 6; i++) {
        wanderlust.roll()
      }
      const results = wanderlust.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 90 attempts', done => {
      expect(wanderlust.attemptsCount).to.be.equal(90)
      done()
    })
    it('should have another guaranteed 5 star item', done => {
      for (let i = 0; i < 8; i++) {
        wanderlust.roll()
      }
      const results = wanderlust.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 180 attempts', done => {
      expect(wanderlust.attemptsCount).to.be.equal(180)
      done()
    })
  })
})
