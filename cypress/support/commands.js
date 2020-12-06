let LOCAL_STORAGE_MEMORY = {};


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

Cypress.Commands.add("wish", banner => {
  cy.get(`.banner-button.${banner}`)
    .click()
  cy.get('.wish-button')
    .contains('Wish x10')
    .click()
  cy.get('.skip-button')
    .click()
  cy.get('.close-button')
    .click()
})

Cypress.Commands.add("validateInventory", (amountSpent, inventoryList) => {
  cy.get('button')
    .contains('Inventory')
    .click()
  cy.get('.amount-spent-badge')
    .contains(amountSpent)
  cy.get('.list-item > .row')
    .each($row => {
      const [, $item, , $quantity] = [...$row.children()]
      const itemName = $item.innerText
      const quantityAmount = $quantity.innerText.replace('X', '')
      const previousItemCount = inventoryList.length
      inventoryList = inventoryList.filter(item => item.item !== itemName && item.quantity !== quantityAmount)
      expect(inventoryList.length).to.equal(previousItemCount - 1)
    })
})


Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
