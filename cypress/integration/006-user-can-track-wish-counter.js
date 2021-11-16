describe('User can track wish counter', () => {
  const bannersList = [
    'moment-of-bloom-2',
    'epitome-invocation',
    'wanderlust-invocation'
  ]
  const userWishCounts = {
    'beginners-wish': 0,
    'invitation-to-mundane-life': 0,
    'wanderlust-invocation': 0,
    'epitome-invocation': 0,
    'ballad-in-goblets': 0,
    'sparkling-steps': 0,
    'gentry-of-hermitage': 0,
    'farewell-of-snezhnaya': 0,
    'secretum-secretorum': 0,
    'adrift-in-the-harbor': 0,
    'dance-of-lanterns': 0,
    'moment-of-bloom': 0,
    'ballad-in-goblets-2': 0,
  }
  before(() => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
  })

  it('Wishes and then counts the wish in 10 increments', () => {
    for (let i = 0; i < 5; i++) {
      const banner = bannersList[Math.floor(Math.random() * bannersList.length)]
      cy.wish(banner)
      userWishCounts[banner] += 10
      cy.get(`.banner-slide.${banner} > div.wish-counter`)
        .click()
        .should('have.text', userWishCounts[banner])
    }
  })
  it('Wishes and then counts the wish in 1 increment', () => {
    for (let i = 0; i < 5; i++) {
      const banner = bannersList[Math.floor(Math.random() * bannersList.length)]
      cy.wishOnce(banner)
      userWishCounts[banner] += 1
      cy.get(`.banner-slide.${banner} > div.wish-counter`)
        .click()
        .should('have.text', userWishCounts[banner])
    }
  })

})
