const CharacterEventWish = require('../../src/models/moment-of-bloom-2')
const StandardWish = require('../../src/models/wanderlust-invocation')
const WeaponWish = require('../../src/models/epitome-invocation')
const BeginnersWish = require('../../src/models/beginners-wish')

const characterEventWish = new CharacterEventWish()
const standardWish = new StandardWish()
const weaponWish = new WeaponWish()
const beginnersWish = new BeginnersWish()

describe('User can view details', () => {
  before(() => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
    cy.resetInventory()
  })
  afterEach(() => {
    cy.get('[data-icon="undo"]')
      .click()
  })

  it('validates Beginners Wish details', () => {
      cy.details(0, '| Beginners', beginnersWish)
    })
  it('validates Character Event Wish details', () => {
      cy.details(1, '| Event Wish', characterEventWish)
  })
  it('validates Weapon Wish details', () => {
      cy.details(2, '| Event Wish', weaponWish)
  })
  it('validates Standard Wish details', () => {
      cy.details(3, '| Standard Wish "Wanderlust', standardWish)
  })
})
