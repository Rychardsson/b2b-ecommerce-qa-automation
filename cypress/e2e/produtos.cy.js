// cypress/e2e/produtos.cy.js
describe('🛍️ Testes de Produtos', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve exibir lista de produtos', () => {
    // Verificar se produtos são carregados
    cy.get('#productsContainer').should('be.visible');
    cy.get('.product-card').should('have.length', 5);
    
    // Verificar produtos específicos
    cy.contains('.product-card', 'Notebook Dell').should('be.visible');
    cy.contains('.product-card', 'Mouse Logitech').should('be.visible');
    cy.contains('.product-card', 'Cadeira Ergonômica').should('be.visible');
    cy.contains('.product-card', 'Mesa de Escritório').should('be.visible');
    cy.contains('.product-card', 'Monitor 24"').should('be.visible');
  });

  it('Deve exibir informações completas dos produtos', () => {
    // Verificar produto com estoque
    cy.contains('.product-card', 'Notebook Dell').within(() => {
      cy.get('.product-name').should('contain.text', 'Notebook Dell');
      cy.get('.product-price').should('contain.text', 'R$ 2500.00');
      cy.get('.product-stock').should('contain.text', 'Estoque: 10');
      cy.get('.add-to-cart').should('not.be.disabled');
    });

    // Verificar produto sem estoque
    cy.contains('.product-card', 'Monitor 24"').within(() => {
      cy.get('.product-stock').should('contain.text', 'Fora de estoque');
      cy.get('.add-to-cart').should('be.disabled');
      cy.get('.add-to-cart').should('contain.text', 'Indisponível');
    });
  });

  it('Deve realizar busca de produtos por nome', () => {
    // Buscar por "notebook"
    cy.get('#searchInput').type('notebook');
    cy.get('#searchBtn').click();
    
    // Verificar resultado
    cy.get('.product-card').should('have.length', 1);
    cy.contains('.product-card', 'Notebook Dell').should('be.visible');
  });

  it('Deve realizar busca de produtos por categoria', () => {
    // Buscar por "informática"
    cy.get('#searchInput').type('informática');
    cy.get('#searchBtn').click();
    
    // Verificar resultados (3 produtos de informática)
    cy.get('.product-card').should('have.length', 3);
    cy.contains('.product-card', 'Notebook Dell').should('be.visible');
    cy.contains('.product-card', 'Mouse Logitech').should('be.visible');
    cy.contains('.product-card', 'Monitor 24"').should('be.visible');
  });

  it('Deve retornar busca vazia para produto inexistente', () => {
    // Buscar por produto que não existe
    cy.get('#searchInput').type('produto inexistente');
    cy.get('#searchBtn').click();
    
    // Verificar que não há resultados
    cy.get('.product-card').should('have.length', 0);
  });

  it('Deve restaurar todos produtos ao limpar busca', () => {
    // Fazer uma busca
    cy.get('#searchInput').type('notebook');
    cy.get('#searchBtn').click();
    cy.get('.product-card').should('have.length', 1);
    
    // Limpar busca
    cy.get('#searchInput').clear();
    cy.get('#searchBtn').click();
    
    // Verificar que todos produtos voltaram
    cy.get('.product-card').should('have.length', 5);
  });

  it('Deve funcionar busca com Enter', () => {
    cy.get('#searchInput').type('mouse{enter}');
    
    cy.get('.product-card').should('have.length', 1);
    cy.contains('.product-card', 'Mouse Logitech').should('be.visible');
  });

  it('Deve destacar visualmente produtos fora de estoque', () => {
    cy.contains('.product-card', 'Monitor 24"')
      .should('have.class', 'out-of-stock')
      .within(() => {
        cy.get('.product-stock').should('have.class', 'out-of-stock');
      });
  });
});
