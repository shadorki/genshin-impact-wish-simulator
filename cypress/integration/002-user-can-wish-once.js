describe('User can wish once', () => {
  before(() => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
    cy.resetInventory()
  })
  it('Beginners wish should block Wish x10 after 10 single wishes', () => {
    for(let i = 0; i < 11; i++) {
      cy.wishOnce('beginners-wish')
    }
    cy.get('.banner-button.beginners-wish')
      .click()
    cy.get('.wish-button.disabled')
      .contains('Wish x10')
      .should('be.visible')
  })
  it('Beginners wish should disappear after 10 more wishes', () => {
    for (let i = 0; i < 9; i++) {
      cy.wishOnce('beginners-wish')
    }
    cy.get('.banner-button.beginners-wish')
      .should('not.exist')
  })
  it('Stress single wish test', () => {
    const banners = [
      'moment-of-bloom-2',
      'epitome-invocation',
      'wanderlust-invocation'
    ]
    for(let i = 0; i < 200; i++) {
      const banner = banners[Math.floor(Math.random() * banners.length)]
      cy.wishOnce(banner)
    }
  })

})
