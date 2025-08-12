// cypress/e2e/carrinho.cy.js
describe("🛒 Testes de Carrinho", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Deve adicionar produto ao carrinho", () => {
    // Verificar carrinho vazio inicialmente
    cy.checkCartCount("0");
    cy.checkCartTotal("0,00");

    // Adicionar notebook
    cy.addToCart("Notebook Dell");

    // Verificar atualizações
    cy.checkCartCount("1");
    cy.checkCartTotal("2500,00");

    // Verificar se produto aparece na lista
    cy.get("#cartItems").should("contain.text", "Notebook Dell");
  });

  it("Deve adicionar múltiplos produtos ao carrinho", () => {
    // Adicionar dois produtos diferentes
    cy.addToCart("Notebook Dell");
    cy.addToCart("Mouse Logitech");

    // Verificar contadores
    cy.checkCartCount("2");
    cy.checkCartTotal("2650,00"); // 2500 + 150

    // Verificar ambos produtos na lista
    cy.get("#cartItems").should("contain.text", "Notebook Dell");
    cy.get("#cartItems").should("contain.text", "Mouse Logitech");
  });

  it("Deve adicionar mesma produto múltiplas vezes", () => {
    // Adicionar o mesmo produto duas vezes
    cy.addToCart("Mouse Logitech");
    cy.addToCart("Mouse Logitech");

    // Verificar que quantidade foi incrementada
    cy.checkCartCount("2");
    cy.checkCartTotal("300,00"); // 150 * 2
    cy.get("#cartItems").should("contain.text", "Mouse Logitech (2x)");
  });

  it("Deve remover produto do carrinho", () => {
    // Adicionar produtos
    cy.addToCart("Notebook Dell");
    cy.addToCart("Mouse Logitech");
    cy.checkCartCount("2");

    // Remover um produto
    cy.get("#cartItems")
      .contains(".cart-item", "Mouse Logitech")
      .find(".remove-item")
      .click();

    // Verificar atualizações
    cy.checkCartCount("1");
    cy.checkCartTotal("2500,00");
    cy.get("#cartItems").should("not.contain.text", "Mouse Logitech");
    cy.get("#cartItems").should("contain.text", "Notebook Dell");
  });

  it("Deve esvaziar carrinho completamente", () => {
    // Adicionar produtos
    cy.addToCart("Notebook Dell");
    cy.addToCart("Mouse Logitech");

    // Remover primeiro produto
    cy.get(".remove-item").first().click();

    // Remover segundo produto (aguardar DOM atualizar)
    cy.get(".remove-item").first().click();

    // Verificar carrinho vazio
    cy.checkCartCount("0");
    cy.checkCartTotal("0,00");
    cy.get("#cartItems").should("contain.text", "Carrinho vazio");
    cy.get("#checkoutBtn").should("be.disabled");
  });

  it("Não deve permitir adicionar produto fora de estoque", () => {
    // Tentar adicionar monitor (fora de estoque)
    cy.contains(".product-card", 'Monitor 24"')
      .find(".add-to-cart")
      .should("be.disabled");

    // Verificar que carrinho permanece vazio
    cy.checkCartCount("0");
  });

  it("Deve persistir carrinho no localStorage", () => {
    // Adicionar produto
    cy.addToCart("Notebook Dell");

    // Verificar localStorage
    cy.window().then((win) => {
      const cart = JSON.parse(win.localStorage.getItem("cart"));
      expect(cart).to.have.length(1);
      expect(cart[0].name).to.equal("Notebook Dell");
      expect(cart[0].quantity).to.equal(1);
    });
  });

  it("Deve restaurar carrinho do localStorage", () => {
    // Primeiro fazer logout para limpar estado
    cy.logout();

    // Simular carrinho no localStorage
    cy.window().then((win) => {
      const cart = [
        { id: 1, name: "Notebook Dell", price: 2500, quantity: 1 },
        { id: 2, name: "Mouse Logitech", price: 150, quantity: 2 },
      ];
      win.localStorage.setItem("cart", JSON.stringify(cart));
    });

    // Fazer login novamente
    cy.login();

    // Verificar se carrinho foi restaurado
    cy.checkCartCount("3"); // 1 notebook + 2 mouses
    cy.checkCartTotal("2800,00"); // 2500 + 300
  });

  it("Deve habilitar/desabilitar botão checkout baseado no carrinho", () => {
    // Inicialmente desabilitado
    cy.get("#checkoutBtn").should("be.disabled");

    // Adicionar produto - deve habilitar
    cy.addToCart("Mouse Logitech");
    cy.get("#checkoutBtn").should("not.be.disabled");

    // Remover produto - deve desabilitar
    cy.get(".remove-item").click();
    cy.get("#checkoutBtn").should("be.disabled");
  });

  it("Deve calcular total corretamente com produtos de diferentes preços", () => {
    // Adicionar vários produtos
    cy.addToCart("Notebook Dell"); // 2500
    cy.addToCart("Mouse Logitech"); // 150
    cy.addToCart("Cadeira Ergonômica"); // 800
    cy.addToCart("Mesa de Escritório"); // 1200

    // Verificar total
    cy.checkCartTotal("4650,00"); // 2500 + 150 + 800 + 1200
    cy.checkCartCount("4");
  });
});
