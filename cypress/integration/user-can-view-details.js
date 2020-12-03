const CharacterEventWish = require('../../src/models/gentry-of-hermitage')
const StandardWish = require('../../src/models/wanderlust-invocation')
const WeaponWish = require('../../src/models/epitome-invocation')
const BeginnersWish = require('../../src/models/beginners-wish')

const characterEventWish = new CharacterEventWish()
const standardWish = new StandardWish()
const weaponWish = new WeaponWish()
const beginnersWish = new BeginnersWish()

const validateItems = (elements, items) => {
  console.log(elements)
  console.log(items)
}

describe('User can view details', () => {
  it('visits the app and resets inventory', () => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
    cy.get('.wish-button')
      .contains('Reset')
      .click()
  })
  it('validates beginners wish details', () => {
    cy.get('.banner-button')
      .first()
      .click()
    cy.get('button')
      .contains('Details')
      .click()
    cy.get('h1')
      .contains('| Beginners')
      .should('be.visible')
    })
})
