// cypress/support/commands.js

// Comando para fazer login
Cypress.Commands.add('login', (email = 'admin@empresa.com', password = '123456') => {
  cy.visit('/');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#loginForm button[type="submit"]').click();
  cy.get('#mainScreen').should('not.have.class', 'hidden');
});

// Comando para adicionar produto ao carrinho
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('.product-card', productName)
    .find('.add-to-cart')
    .click();
});

// Comando para verificar contador do carrinho
Cypress.Commands.add('checkCartCount', (expectedCount) => {
  cy.get('#cartCount').should('contain.text', expectedCount);
});

// Comando para verificar total do carrinho
Cypress.Commands.add('checkCartTotal', (expectedTotal) => {
  cy.get('#cartTotal').should('contain.text', expectedTotal);
});

// Comando para limpar carrinho
Cypress.Commands.add('clearCart', () => {
  cy.get('.remove-item').each(($btn) => {
    cy.wrap($btn).click();
  });
});

// Comando para verificar se produto está fora de estoque
Cypress.Commands.add('checkOutOfStock', (productName) => {
  cy.contains('.product-card', productName)
    .should('have.class', 'out-of-stock')
    .find('.add-to-cart')
    .should('be.disabled');
});

// Comando para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('#logoutBtn').click();
  cy.get('#loginScreen').should('not.have.class', 'hidden');
});
