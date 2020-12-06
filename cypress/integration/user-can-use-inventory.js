/// <reference types="Cypress" />

describe('User can use inventory', () => {
  let inventory = {}
  let amountSpent = null
  const updateInventory = item => {
    if (inventory[item]) {
      inventory[item].quantity++
    } else {
      inventory[item] = { item }
      inventory[item].quantity = 1
    }
  }

  const calculateAmountSpent = list => {
    let wishes = list.reduce((acc, curr) => acc + curr.quantity, 0)
    return `$${((0.0129 * 160) * wishes).toFixed(2)}`
  }

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  before(() => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
    cy.get('.wish-button')
      .contains('Reset')
      .click()
  })
  it('Validates the inventory', () => {
    const banners = [
      'gentry-of-hermitage',
      'epitome-invocation',
      'wanderlust-invocation'
    ]
    for (let i = 0; i < 10; i++) {
      const banner = banners[Math.floor(Math.random() * banners.length)]
      cy.get(`.banner-button.${banner}`)
        .click()
      cy.get('.wish-button')
        .contains('Wish x10')
        .click()
      cy.get('.skip-button')
        .click()
      cy.get('.wish-item > div > div:first-child')
        .each($wish => {
          updateInventory($wish.text())
        })
        .then(() => {
          let inventoryList = Object.values(inventory)
          amountSpent = calculateAmountSpent(inventoryList)
          cy.get('.close-button')
            .click()
          cy.validateInventory(amountSpent, inventoryList)

          cy.get('select#view')
            .select('Icons')
          cy.get('select#showOnly')
            .select('Characters')
          cy.get('select#showOnly')
            .select('Weapons')
          cy.get('select#showOnly')
            .select('5 Stars')
          cy.get('select#showOnly')
            .select('4 Stars')
          cy.get('select#showOnly')
            .select('3 Stars')
          cy.get('select#showOnly')
            .select('All')
          cy.get('select#orderBy')
            .select('Name')
          cy.get('select#orderBy')
            .select('Quantity')
            cy.get('select#orderBy')
            .select('Rating')

          cy.get('select#view')
            .select('List')
          cy.get('select#showOnly')
            .select('Characters')
          cy.get('select#showOnly')
            .select('Weapons')
          cy.get('select#showOnly')
            .select('5 Stars')
          cy.get('select#showOnly')
            .select('4 Stars')
          cy.get('select#showOnly')
            .select('3 Stars')
          cy.get('select#showOnly')
            .select('All')
          cy.get('select#orderBy')
            .select('Name')
          cy.get('select#orderBy')
            .select('Quantity')
          cy.get('select#orderBy')
            .select('Rating')

          cy.get('[data-icon="undo"]')
            .click()
        })
    }
  })
  it('Preserves Inventory in Local Storage', () => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
    let inventoryList = Object.values(inventory)
    amountSpent = calculateAmountSpent(inventoryList)
    cy.validateInventory(amountSpent, inventoryList)
    cy.get('[data-icon="undo"]')
      .click()
    cy.get('.wish-button')
      .contains('Reset')
      .click()
    cy.get('button')
      .contains('Inventory')
      .click()
    cy.get('h4')
      .contains('No Items :(')
    cy.get('img[alt="Sad paimon"]')
      .should('be.visible')
  })
})
