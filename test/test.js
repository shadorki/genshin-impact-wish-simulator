const chai = require('chai')
const { expect } = chai
import BalladInGoblets from '../src/models/ballad-in-goblets'
let ballad = null

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
    it('should have a guaranteed 5 star item', done => {
      for(let i = 0; i < 7; i++) {
        ballad.roll()
      }
      const results = ballad.roll()
      const item = results.find(item => item.rating === 5)
      expect(!!(item)).to.be.true
      done()
    })
    it('should register 100 attempts', done => {
      expect(ballad.attemptsCount).to.be.equal(90)
      done()
    })
  })
})
