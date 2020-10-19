const chai = require('chai')
const { expect } = chai
import BalladInGoblets from '../src/models/ballad-in-goblets'
import BeginnersWish from '../src/models/beginners-wish'
import EpitomeInvocation from '../src/models/epitome-invocation'
import WanderlustInvocation from '../src/models/wanderlust-invocation'
let ballad = null
let beginners = null
let epitome = null
let wanderlust = null

describe('Testing suite for genshin impact gacha', () => {
  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////Testing Ballad In Goblets//////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  describe('Ballad In Goblets', () => {
    it('should return an instance of Ballad In Goblets', done => {
      ballad = new BalladInGoblets()
      expect(ballad instanceof BalladInGoblets).to.be.true
      done()
    })
    it('should have a 4 or 5 star item', done => {
      const results = ballad.roll()
      const item = results.find(item => item.rating === 4 || item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 10 attempts', done => {
      expect(ballad.attemptsCount).to.be.equal(10)
      done()
    })
    it('should give us a total of 10 items', done => {
      const results = ballad.roll()
      expect(results.length === 10).to.be.true
      done()
    })
    it('should have a guaranteed 5 star item', done => {
      for(let i = 0; i < 6; i++) {
        ballad.roll()
      }
      const results = ballad.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 90 attempts', done => {
      expect(ballad.attemptsCount).to.be.equal(90)
      done()
    })
    it('should have another guaranteed 5 star item', done => {
      for (let i = 0; i < 8; i++) {
        ballad.roll()
      }
      const results = ballad.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 180 attempts', done => {
      expect(ballad.attemptsCount).to.be.equal(180)
      done()
    })
    it('should have guaranteed Venti', done => {
      // Initialize required variables.
      const results = [];
      const balladVenti = new BalladInGoblets();
      const guaranteedGachaLimit = 18;
      let hasVenti = false;

      // Logically, we'll get Venti after 180 pulls (guaranteed SSR every 90 pulls, then the next one will be Venti). 
      // Henceforth, it is the maximum pull.
      for (let i = 0; i < guaranteedGachaLimit; i++) {
        results.push(balladVenti.roll());

        // Then, if we get Venti in less than 180 pulls, set 'hasVenti' to true and exit the loop.
        if (results[i].find((item) => item.rating === 5 && item.name === 'Venti')) {
          hasVenti = true;
          break;
        }
      }

      expect(hasVenti).to.be.true;
      done();
    })
    it('should give a Venti after pulling an SSR that is not Venti (first Venti pull is also acceptable)', done => {
      const results = [];
      const balladVenti = new BalladInGoblets();
      let hasVenti = false;
      let hasSSR = false;

      // Infinite loop, we want to keep pulling until we discovered a Venti.
      while (true) {
        const roll = balladVenti.roll();
        results.push(roll);
        
        // Filter all the results by its five star.
        // If there are any results, store its name in a new array for easier checking.
        const filteredResults = results[results.length - 1].filter(item => item.rating === 5);
        const names = filteredResults.map(e => e.name);
        const areNamesFilled = names.length > 0;
        
        // This step will fail if the second SSR is not Venti.
        // We'll also have to check if we pulled any SSR, hence the 'names.length' to prevent false negatives.
        if (hasSSR && !names.includes('Venti') && areNamesFilled) {
          expect.fail('The second SSR pulled was not Venti!');
        }

        // If the first SSR is not Venti, set 'hasSSR' to true.
        if (!names.includes('Venti') && areNamesFilled) {
          hasSSR = true;
        }

        // The next SSR, we have to check if it is truly Venti.
        if (hasSSR && names.includes('Venti') && areNamesFilled) {
          hasVenti = true;
          break;
        }

        // If the SSR is Venti, then exit.
        if (names.includes('Venti') && areNamesFilled) {
          hasVenti = true;
          break;
        }
      }

      expect(hasVenti).to.be.true;
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
