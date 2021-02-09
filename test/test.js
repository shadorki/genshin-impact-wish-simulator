const chai = require('chai')
const fs = require('fs')
const util = require('util')
const p = require('path');
const readdir = util.promisify(fs.readdir);
const { expect } = chai
import BeginnersWish from '../src/models/beginners-wish'
import EpitomeInvocation from '../src/models/epitome-invocation'
import WanderlustInvocation from '../src/models/wanderlust-invocation'
import InvitationToMundaneLife from '../src/models/invitation-to-mundane-life'
import itemSchema from './schema/item'
let invitation = null
let beginners = null
let epitome = null
let wanderlust = null

describe('Validate that all data has valid images', () => {
  it('should have an image for each item', async () => {
      try {
        let invitation = require('../src/data/invitation-to-mundane-life.json')
        let wanderlust = require('../src/data/wanderlust-invocation.json')
        let epitome = require('../src/data/epitome-invocation.json')
        const weaponPix = await readdir(p.join(__dirname, '../src/assets/images/weapons'))
        const characterPix = await readdir(p.join(__dirname, '../src/assets/images/characters'))
        const pics = [...weaponPix, ...characterPix]
        const arrs = [invitation, wanderlust, epitome]
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

describe('User can Wish x10', () => {
  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////Testing Adrift in the Harbor//////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  describe('Adrift in the Harbor', () => {
    var inventory = []

    it('should return an instance of Adrift in the Harbor', done => {
      invitation = new InvitationToMundaneLife()
      expect(invitation instanceof InvitationToMundaneLife).to.be.true
      done()
    })
    it('should have a 4 or 5 star item', done => {
      const results = invitation.roll()
      inventory.push(...results)
      const item = inventory.find(item => item.rating === 4 || item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 10 attempts', done => {
      expect(invitation.attemptsCount).to.be.equal(10)
      done()
    })
    it('should give us a total of 10 items', done => {
      const results = invitation.roll()
      inventory.push(...results)
      expect(results.length === 10).to.be.true
      done()
    })
    it('should have a guaranteed 5 star item', done => {
      var results = [];
      for(let i = 0; i < 7; i++) {
        results = invitation.roll()
        inventory.push(...results)
      }
      const item = inventory.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 90 attempts', done => {
      expect(invitation.attemptsCount).to.be.equal(90)
      done()
    })
    it('should have another guaranteed 5 star item', done => {
      var results = [];
      for (let i = 0; i < 9; i++) {
       results = invitation.roll()
        inventory.push(...results)
      }
      const item = inventory.filter(item => item.rating === 5)
      expect(item.length >= 2).to.be.true
      done()
    })
    it('should register 180 attempts', done => {
      expect(invitation.attemptsCount).to.be.equal(180)
      done()
    })
    it('should have guaranteed Xiao', done => {
      // Initialize required variables.
      const results = [];
      const invitationXiao = new InvitationToMundaneLife();
      const guaranteedGachaLimit = 18;
      let hasXiao = false;

      // Logically, we'll get Xiao after 180 pulls (guaranteed SSR every 90 pulls, then the next one will be Xiao).
      // Henceforth, it is the maximum pull.
      for (let i = 0; i < guaranteedGachaLimit; i++) {
        results.push(invitationXiao.roll());

        // Then, if we get Xiao in less than 180 pulls, set 'hasXiao' to true and exit the loop.
        if (results[i].find(item => item.rating === 5 && item.name === 'Xiao')) {
          hasXiao = true;
          break;
        }
      }

      expect(hasXiao).to.be.true;
      done();
    })
    it('should give a Xiao after pulling an SSR that is not Xiao (first Xiao pull is also acceptable)', done => {
      const results = [];
      const invitationXiao = new InvitationToMundaneLife();
      let hasXiao = false;
      let hasSSR = false;

      // Infinite loop, we want to keep pulling until we discovered a Xiao.
      while (true) {
        const roll = invitationXiao.roll();
        results.push(roll);

        // Filter all the results by its five star.
        // If there are any results, store its name in a new array for easier checking.
        const filteredResults = roll.filter(item => item.rating === 5);
        const names = filteredResults.map(e => e.name);
        const areNamesFilled = names.length > 0;

        // This step will fail if the second SSR is not Xiao.
        // We'll also have to check if we pulled any SSR, hence the 'names.length' to prevent false negatives.
        if (hasSSR && !names.includes('Xiao') && areNamesFilled) {
          expect.fail('The second SSR pulled was not Xiao!');
        }

        // If the first SSR is not Xiao, set 'hasSSR' to true.
        if (!names.includes('Xiao') && areNamesFilled) {
          hasSSR = true;
        }

        // The next SSR, we have to check if it is truly Xiao.
        if (hasSSR && names.includes('Xiao') && areNamesFilled) {
          hasXiao = true;
          break;
        }

        // If the SSR is Xiao, then exit.
        if (names.includes('Xiao') && areNamesFilled) {
          hasXiao = true;
          break;
        }
      }

      expect(hasXiao).to.be.true;
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
    var inventory = [];

    it('should return an instance of Epitome Invocation', done => {
      epitome = new EpitomeInvocation()
      expect(epitome instanceof EpitomeInvocation).to.be.true
      done()
    })
    it('should have a 4 or 5 star item', done => {
      const results = epitome.roll()
      inventory.push(...results)
      const item = inventory.find(item => item.rating === 4 || item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 10 attempts', done => {
      expect(epitome.attemptsCount).to.be.equal(10)
      done()
    })
    it('should give us a total of 10 items', done => {
      const results = epitome.roll()
      inventory.push(...results)
      expect(results.length === 10).to.be.true
      done()
    })
    it('should have a guaranteed 5 star item', done => {
      var results = [];
      for (let i = 0; i < 6; i++) {
        results = epitome.roll()
        inventory.push(...results)
      }
      const item = inventory.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 80 attempts', done => {
      expect(epitome.attemptsCount).to.be.equal(80)
      done()
    })
    it('should have another guaranteed 5 star item', done => {
      var results = [];
      for (let i = 0; i < 8; i++) {
        results = epitome.roll()
        inventory.push(...results)
      }
      const item = inventory.filter(item => item.rating === 5)
      expect(item.length >= 2).to.be.true
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
    var inventory = [];

    it('should return an instance of Wanderlust Invocation', done => {
      wanderlust = new WanderlustInvocation()
      expect(wanderlust instanceof WanderlustInvocation).to.be.true
      done()
    })
    it('should have a 4 or 5 star item', done => {
      const results = wanderlust.roll()
      inventory.push(...results)
      const item = inventory.find(item => item.rating === 4 || item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 10 attempts', done => {
      expect(wanderlust.attemptsCount).to.be.equal(10)
      done()
    })
    it('should give us a total of 10 items', done => {
      const results = wanderlust.roll()
      inventory.push(...results)
      expect(results.length === 10).to.be.true
      done()
    })
    it('should have a guaranteed 5 star item', done => {
      var results = [];
      for (let i = 0; i < 7; i++) {
        results = wanderlust.roll()
        inventory.push(...results)
      }

      const item = inventory.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 90 attempts', done => {
      expect(wanderlust.attemptsCount).to.be.equal(90)
      done()
    })
    it('should have another guaranteed 5 star item', done => {
      var results = [];
      for (let i = 0; i < 9; i++) {
        results = wanderlust.roll()
        inventory.push(...results)
      }

      const item = inventory.filter(item => item.rating === 5)
      expect(item.length >= 2).to.be.true
      done()
    })
    it('should register 180 attempts', done => {
      expect(wanderlust.attemptsCount).to.be.equal(180)
      done()
    })
  })
})

describe('User can Wish x1', () => {
  it('Beginners wish should be blocked from doing 10 wishes', () => {
    let canUserWishFor10Items = true
    const disableUserCanWishFor10Items = () => {
      canUserWishFor10Items = false
    }
    let beginners = new BeginnersWish(() => {}, disableUserCanWishFor10Items)
    for(let i = 0; i < 11; i++) {
      const item = beginners.rollOnce()
      expect(itemSchema.isValidSync(item)).to.be.true
    }
    expect(canUserWishFor10Items).to.be.false
    const noItems = beginners.roll()
    expect(noItems).to.be.null
    for (let i = 0; i < 8; i++) {
      const item = beginners.rollOnce()
      expect(itemSchema.isValidSync(item)).to.be.true
    }
    const noItemsAgain = beginners.roll()
    expect(noItemsAgain).to.be.null
    const lastItem = beginners.rollOnce()
    expect(itemSchema.isValidSync(lastItem)).to.be.true
    const lastItemIsNull = beginners.rollOnce()
    expect(lastItemIsNull).to.be.null
  })
})
