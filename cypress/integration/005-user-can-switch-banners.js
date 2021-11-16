describe('User can switch banners', () => {
  const banners = {
      'ballad-in-goblets': 'Ballad In Goblets',
      'sparkling-steps': 'Sparkling Steps',
      'gentry-of-hermitage': 'Gentry Of Hermitage',
      'farewell-of-snezhnaya': 'Farewell of Snezhnaya',
      'secretum-secretorum': 'Secretum Secretorum',
      'adrift-in-the-harbor': 'Adrift in the Harbor',
      'invitation-to-mundane-life': 'Invitation to Mundane Life',
      'dance-of-lanterns': 'Dance Of Lanterns',
      'moment-of-bloom': 'Moment Of Bloom',
      'moment-of-bloom-2': 'Moment of Bloom 2',
    }
  before(() => {
    cy.visit('/')
    cy.get('.close-button')
      .click()
  })
  for (const b in banners) {
    it(`validates the character banner: ${banners[b]}`, () => {
      cy.get('button')
        .contains('Settings')
        .click()
      cy.get('select#characterBanner')
        .select(banners[b])
      cy.get('button')
        .contains('Apply Changes')
        .click()
      cy.wish(b)
    })
  }

})
