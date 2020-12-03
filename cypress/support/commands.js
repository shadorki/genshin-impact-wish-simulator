// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("details", (bannerPosition, header, modelData) => {
      cy.get('.banner-button')
      .eq(bannerPosition)
      .click()
    cy.get('button')
      .contains('Details')
      .click()
    cy.get('h1')
      .contains(header)
      .should('be.visible')
    const fiveStars = modelData.getDrops(5).map(item => item.name)
    cy.get('table')
      .first()
      .within(() => {
        cy.get('tbody > tr > td')
          .then($td => [...$td].filter(item => item.innerText !== 'Character' && item.innerText !== 'Weapon'))
          .each(($td, i) => {
            expect($td.text()).to.equal(fiveStars[i])
          })
      })
    const fourStars = modelData.getDrops(4).map(item => item.name)
    cy.get('table')
      .eq(1)
      .within(() => {
        cy.get('tbody > tr > td')
          .then($td => [...$td].filter(item => item.innerText !== 'Character' && item.innerText !== 'Weapon'))
          .each(($td, i) => {
            expect($td.text()).to.equal(fourStars[i])
          })
      })
    const threeStars = modelData.getDrops(3).map(item => item.name)
    cy.get('table')
      .last()
      .within(() => {
        cy.get('tbody > tr > td')
          .then($td => [...$td].filter(item => item.innerText !== 'Character' && item.innerText !== 'Weapon'))
          .each(($td, i) => {
            expect($td.text()).to.equal(threeStars[i])
          })
      })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
