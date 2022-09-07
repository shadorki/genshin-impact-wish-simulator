describe('User can wish', () => {
  before(() => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
    cy.resetInventory()
  })
  it('Beginners wish should contain noelle', () => {
    cy.get('.banner-button.beginners-wish')
      .click()
    cy.get('.wish-button')
      .contains('Wish x10')
      .click()
    cy.get('.skip-button')
      .click()
    cy.get('.wish-item div > div:first-child')
      .contains('Noelle')
    cy.get('.close-button')
      .click()
  })
  it('Beginners wish should disappear after second wish set', () => {
    cy.wish('beginners-wish')
    cy.get('.banner-button.beginners-wish')
      .should('not.exist')
  })
  it('Stress wish test', () => {
    const banners = [
      'moment-of-bloom-2',
      'epitome-invocation',
      'wanderlust-invocation'
    ]
    for(let i = 0; i < 200; i++) {
      const banner = banners[Math.floor(Math.random() * banners.length)]
      cy.wish(banner)
    }
  })

})
