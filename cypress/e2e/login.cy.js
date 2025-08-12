// cypress/e2e/login.cy.js
describe("🔐 Testes de Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Deve fazer login com credenciais válidas", () => {
    cy.get("#email").type("admin@empresa.com");
    cy.get("#password").type("123456");
    cy.get('#loginForm button[type="submit"]').click();

    // Verificar se foi redirecionado para tela principal
    cy.get("#mainScreen").should("not.have.class", "hidden");
    cy.get("#loginScreen").should("have.class", "hidden");

    // Verificar se as informações do usuário aparecem
    cy.get("#userInfo").should("contain.text", "Empresa Teste");
    cy.get("#userInfo").should("contain.text", "admin@empresa.com");
  });

  it("Deve exibir erro com credenciais inválidas", () => {
    cy.get("#email").type("usuario@inexistente.com");
    cy.get("#password").type("senhaerrada");
    cy.get('#loginForm button[type="submit"]').click();

    // Verificar se erro é exibido
    cy.get("#loginError").should("be.visible");
    cy.get("#loginError").should("contain.text", "Usuário não encontrado");

    // Verificar se permanece na tela de login
    cy.get("#loginScreen").should("not.have.class", "hidden");
    cy.get("#mainScreen").should("have.class", "hidden");
  });

  it("Deve exibir erro com senha incorreta", () => {
    cy.get("#email").type("admin@empresa.com");
    cy.get("#password").type("senhaerrada");
    cy.get('#loginForm button[type="submit"]').click();

    cy.get("#loginError").should("contain.text", "Senha incorreta");
  });

  it("Deve validar campos obrigatórios", () => {
    // Tentar submeter formulário vazio
    cy.get('#loginForm button[type="submit"]').click();

    // Verificar validação HTML5
    cy.get("#email:invalid").should("exist");
    cy.get("#password:invalid").should("exist");
  });

  it("Deve fazer logout corretamente", () => {
    // Primeiro fazer login
    cy.login();

    // Fazer logout
    cy.get("#logoutBtn").click();

    // Verificar redirecionamento
    cy.get("#loginScreen").should("not.have.class", "hidden");
    cy.get("#mainScreen").should("have.class", "hidden");

    // Verificar se token foi removido
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
  });
});
