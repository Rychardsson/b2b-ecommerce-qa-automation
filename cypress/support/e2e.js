// cypress/support/e2e.js
import "./commands";

// Configurações globais
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

// Comandos customizados para limpar estado
beforeEach(() => {
  cy.clearLocalStorage();
});
