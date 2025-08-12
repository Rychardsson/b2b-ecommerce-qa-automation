// cypress/e2e/checkout.cy.js
describe('💳 Testes de Checkout', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve finalizar pedido com sucesso', () => {
    // Adicionar produtos ao carrinho
    cy.addToCart('Notebook Dell');
    cy.addToCart('Mouse Logitech');
    
    // Fazer checkout
    cy.get('#checkoutBtn').click();
    
    // Verificar processamento (aguardar 1 segundo conforme backend)
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    
    cy.get('@alertStub').should('have.been.calledWith', 
      Cypress.sinon.match(/✅.*Pedido realizado com sucesso!.*Pedido #\d+/)
    );
    
    // Verificar se carrinho foi limpo
    cy.checkCartCount('0');
    cy.checkCartTotal('0,00');
    cy.get('#cartItems').should('contain.text', 'Carrinho vazio');
    
    // Verificar se localStorage foi limpo
    cy.window().then((win) => {
      expect(win.localStorage.getItem('cart')).to.be.null;
    });
  });

  it('Não deve permitir checkout com carrinho vazio', () => {
    // Verificar que botão está desabilitado
    cy.get('#checkoutBtn').should('be.disabled');
    
    // Tentar clicar (não deve funcionar)
    cy.get('#checkoutBtn').should('not.be.enabled');
  });

  it('Deve processar checkout com diferentes produtos', () => {
    // Adicionar vários produtos
    cy.addToCart('Cadeira Ergonômica');
    cy.addToCart('Mesa de Escritório');
    cy.addToCart('Mouse Logitech');
    cy.addToCart('Mouse Logitech'); // adicionar mais um
    
    // Verificar total antes do checkout
    cy.checkCartTotal('2350,00'); // 800 + 1200 + 150 + 150
    
    // Fazer checkout
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    
    cy.get('#checkoutBtn').click();
    
    // Verificar sucesso
    cy.get('@alertStub').should('have.been.calledWith', 
      Cypress.sinon.match(/✅.*Pedido realizado com sucesso!/)
    );
  });

  it('Deve tratar erro de conexão no checkout', () => {
    // Interceptar API para simular erro
    cy.intercept('POST', '/api/checkout', {
      statusCode: 500,
      body: { error: 'Erro interno do servidor' }
    }).as('checkoutError');
    
    // Adicionar produto e tentar checkout
    cy.addToCart('Notebook Dell');
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    
    cy.get('#checkoutBtn').click();
    
    cy.wait('@checkoutError');
    
    // Verificar mensagem de erro
    cy.get('@alertStub').should('have.been.calledWith', 
      '❌ Erro: Erro interno do servidor'
    );
    
    // Verificar que carrinho não foi limpo
    cy.checkCartCount('1');
  });

  it('Deve simular timeout no checkout', () => {
    // Interceptar API com delay
    cy.intercept('POST', '/api/checkout', (req) => {
      req.reply((res) => {
        res.delay(2000); // 2 segundos de delay
        res.send({
          success: true,
          orderId: 12345,
          message: 'Pedido realizado com sucesso!'
        });
      });
    }).as('slowCheckout');
    
    cy.addToCart('Notebook Dell');
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    
    cy.get('#checkoutBtn').click();
    
    // Aguardar resposta lenta
    cy.wait('@slowCheckout');
    
    // Verificar que funcionou mesmo com delay
    cy.get('@alertStub').should('have.been.calledWith', 
      '✅ Pedido realizado com sucesso!\nPedido #12345'
    );
  });

  it('Deve manter estado consistente após checkout falhado', () => {
    // Simular falha de rede
    cy.intercept('POST', '/api/checkout', { forceNetworkError: true }).as('networkError');
    
    cy.addToCart('Notebook Dell');
    cy.addToCart('Mouse Logitech');
    
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });
    
    cy.get('#checkoutBtn').click();
    
    cy.wait('@networkError');
    
    // Verificar erro de conexão
    cy.get('@alertStub').should('have.been.calledWith', 
      '❌ Erro de conexão durante o checkout'
    );
    
    // Verificar que carrinho não foi alterado
    cy.checkCartCount('2');
    cy.checkCartTotal('2650,00');
    cy.get('#checkoutBtn').should('not.be.disabled');
  });

  it('Deve validar dados enviados no checkout', () => {
    cy.intercept('POST', '/api/checkout').as('checkoutRequest');
    
    // Adicionar produtos específicos
    cy.addToCart('Notebook Dell');
    cy.addToCart('Mouse Logitech');
    
    cy.get('#checkoutBtn').click();
    
    // Verificar payload enviado
    cy.wait('@checkoutRequest').then((interception) => {
      const { body } = interception.request;
      expect(body.items).to.have.length(2);
      expect(body.items[0]).to.include({
        name: 'Notebook Dell',
        price: 2500,
        quantity: 1
      });
      expect(body.items[1]).to.include({
        name: 'Mouse Logitech',
        price: 150,
        quantity: 1
      });
    });
  });
});
