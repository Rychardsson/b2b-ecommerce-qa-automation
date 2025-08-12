// cypress/e2e/api.cy.js - Testes de API
describe("🔌 Testes de API", () => {
  const baseUrl = "http://localhost:3000/api";

  describe("Autenticação", () => {
    it("POST /api/login - Login com credenciais válidas", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: {
          email: "admin@empresa.com",
          password: "123456",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
        expect(response.body).to.have.property("user");
        expect(response.body.user.email).to.eq("admin@empresa.com");
        expect(response.body.user.company).to.eq("Empresa Teste");
      });
    });

    it("POST /api/login - Login com credenciais inválidas", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: {
          email: "user@invalid.com",
          password: "wrongpass",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq("Usuário não encontrado");
      });
    });

    it("POST /api/login - Login com senha incorreta", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: {
          email: "admin@empresa.com",
          password: "wrongpass",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq("Senha incorreta");
      });
    });

    it("POST /api/login - Login sem dados", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Email e senha são obrigatórios");
      });
    });
  });

  describe("Produtos", () => {
    it("GET /api/products - Listar todos os produtos", () => {
      cy.request("GET", `${baseUrl}/products`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length(5);

        // Verificar estrutura dos produtos
        response.body.forEach((product) => {
          expect(product).to.have.property("id");
          expect(product).to.have.property("name");
          expect(product).to.have.property("price");
          expect(product).to.have.property("stock");
          expect(product).to.have.property("category");
          expect(product).to.have.property("description");
        });
      });
    });

    it("GET /api/products - Verificar produtos específicos", () => {
      cy.request("GET", `${baseUrl}/products`).then((response) => {
        const products = response.body;

        // Verificar Notebook Dell
        const notebook = products.find((p) => p.name === "Notebook Dell");
        expect(notebook).to.exist;
        expect(notebook.price).to.eq(2500);
        expect(notebook.stock).to.eq(10);
        expect(notebook.category).to.eq("Informática");

        // Verificar Monitor sem estoque
        const monitor = products.find((p) => p.name === 'Monitor 24"');
        expect(monitor).to.exist;
        expect(monitor.stock).to.eq(0);
      });
    });

    it("GET /api/products/search - Buscar produtos por nome", () => {
      cy.request("GET", `${baseUrl}/products/search?q=notebook`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.length(1);
          expect(response.body[0].name).to.eq("Notebook Dell");
        }
      );
    });

    it("GET /api/products/search - Buscar produtos por categoria", () => {
      cy.request("GET", `${baseUrl}/products/search?q=informática`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.length(3);

          const categories = response.body.map((p) => p.category);
          categories.forEach((category) => {
            expect(category).to.eq("Informática");
          });
        }
      );
    });

    it("GET /api/products/search - Buscar produto inexistente", () => {
      cy.request("GET", `${baseUrl}/products/search?q=produtoinexistente`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an("array");
          expect(response.body).to.have.length(0);
        }
      );
    });

    it("GET /api/products/search - Busca sem parâmetro", () => {
      cy.request("GET", `${baseUrl}/products/search`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
      });
    });
  });

  describe("Checkout", () => {
    it("POST /api/checkout - Checkout com sucesso", () => {
      const items = [
        { id: 1, name: "Notebook Dell", price: 2500, quantity: 1 },
        { id: 2, name: "Mouse Logitech", price: 150, quantity: 2 },
      ];

      cy.request({
        method: "POST",
        url: `${baseUrl}/checkout`,
        body: { items },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.be.true;
        expect(response.body).to.have.property("orderId");
        expect(response.body.message).to.eq("Pedido realizado com sucesso!");
        expect(response.body.orderId).to.be.a("number");
      });
    });

    it("POST /api/checkout - Checkout com carrinho vazio", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/checkout`,
        body: { items: [] },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Carrinho vazio");
      });
    });

    it("POST /api/checkout - Checkout sem itens", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/checkout`,
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Carrinho vazio");
      });
    });

    it("POST /api/checkout - Verificar timeout simulado", () => {
      const items = [{ id: 1, name: "Test Product", price: 100, quantity: 1 }];

      // Configurar timeout mais longo para este teste
      cy.request({
        method: "POST",
        url: `${baseUrl}/checkout`,
        body: { items },
        timeout: 5000, // 5 segundos
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.be.true;
        // Verificar que levou pelo menos 1 segundo (simulação do backend)
        expect(response.duration).to.be.greaterThan(1000);
      });
    });
  });

  describe("Testes de Performance da API", () => {
    it("GET /api/products - Deve responder rapidamente", () => {
      const start = Date.now();

      cy.request("GET", `${baseUrl}/products`).then((response) => {
        const duration = Date.now() - start;
        expect(response.status).to.eq(200);
        expect(duration).to.be.lessThan(500); // menos de 500ms
      });
    });

    it("POST /api/login - Deve autenticar rapidamente", () => {
      const start = Date.now();

      cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: {
          email: "admin@empresa.com",
          password: "123456",
        },
      }).then((response) => {
        const duration = Date.now() - start;
        expect(response.status).to.eq(200);
        expect(duration).to.be.lessThan(1000); // menos de 1 segundo
      });
    });
  });

  describe("Testes de Segurança da API", () => {
    it("Deve retornar erro para SQL injection attempt", () => {
      cy.request({
        method: "POST",
        url: `${baseUrl}/login`,
        body: {
          email: "'; DROP TABLE users; --",
          password: "123456",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        // Não deve causar erro 500 (SQL injection bloqueada)
      });
    });

    it("Deve validar entrada para busca de produtos", () => {
      // Tentar busca com caracteres especiais
      cy.request(
        "GET",
        `${baseUrl}/products/search?q=<script>alert('xss')</script>`
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an("array");
      });
    });
  });
});
