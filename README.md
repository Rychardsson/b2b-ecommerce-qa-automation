# 🛍️ E-commerce B2B - Sistema Completo de QA

> **Sistema educacional completo para práticas de Quality Assurance com testes manuais e automatizados**

[![Tests](https://img.shields.io/badge/tests-48%2F48%20passing-brightgreen)](/) 
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](/)
[![Node.js](https://img.shields.io/badge/node.js-v22.15.0-green)](/)
[![Cypress](https://img.shields.io/badge/cypress-13.17.0-blue)](/)

---

## 🚀 **Início Rápido**

### 1️⃣ **Clone e Instale**
```bash
git clone https://github.com/Rychardsson/b2b-ecommerce-qa-automation.git
cd b2b-ecommerce-qa-automation
npm install
```

### 2️⃣ **Execute o Sistema**
```bash
npm start
# 🌐 Acesse: http://localhost:3000
```

### 3️⃣ **Faça Login**
```
📧 Email: admin@empresa.com
🔑 Senha: 123456
```

### 4️⃣ **Execute os Testes**
```bash
# Interface visual
npm test

# Modo headless (CI/CD)
npm run test:headless
```

---

## 📋 **Visão Geral**

Este projeto é um **e-commerce B2B completo** desenvolvido especificamente para demonstrar e praticar:

✅ **Testes Manuais** - 16 casos de teste documentados  
✅ **Testes Automatizados** - 48 testes E2E com Cypress  
✅ **Testes de API** - 18 testes de endpoints REST  
✅ **Cenários de Erro** - Simulação de falhas reais  
✅ **Gestão de Bugs** - Templates e workflows  

---

## 🛠️ **Stack Tecnológica**

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| **Frontend** | HTML5, CSS3, JavaScript ES6 | Vanilla |
| **Backend** | Node.js + Express | 4.18.2 |
| **Database** | SQLite | Em memória |
| **Auth** | JWT + bcrypt | - |
| **Testing** | Cypress | 13.17.0 |
| **QA Tools** | Manual Testing + Bug Templates | - |

---

## 🎯 **Funcionalidades Testadas**

### 🔐 **Autenticação**
- [x] Login com credenciais válidas/inválidas
- [x] Logout e limpeza de sessão
- [x] Validação de campos obrigatórios
- [x] Tratamento de erros de conexão

### 🛍️ **Catálogo de Produtos**
- [x] Exibição de 5 produtos de teste
- [x] Busca por nome e categoria
- [x] Filtros e resultados vazios
- [x] Produtos fora de estoque (Monitor 24")

### 🛒 **Carrinho de Compras**
- [x] Adicionar/remover produtos
- [x] Cálculo automático de totais
- [x] Persistência no localStorage
- [x] Validações de estoque

### 💳 **Checkout**
- [x] Finalização de pedidos
- [x] Simulação de processamento (1s)
- [x] Validação de carrinho vazio
- [x] Tratamento de erros de rede

---

## 🧪 **Estratégia de Testes**

### 📝 **Testes Manuais** (`/testes-manuais/`)

| Arquivo | Descrição | Casos |
|---------|-----------|-------|
| `casos-de-teste.md` | Casos detalhados por funcionalidade | 16 |
| `template-bugs.md` | Templates para registro de bugs | - |

**Tipos de teste cobertos:**
- ✅ Funcionais (login, CRUD, fluxos)
- ✅ Usabilidade (interface, responsividade)  
- ✅ Regressão (fluxo completo)
- ✅ Exploratórios (cenários não mapeados)

### 🤖 **Testes Automatizados** (`/cypress/e2e/`)

| Arquivo | Funcionalidade | Testes |
|---------|----------------|--------|
| `login.cy.js` | Autenticação | 5 |
| `produtos.cy.js` | Catálogo | 8 |
| `carrinho.cy.js` | Carrinho | 10 |
| `checkout.cy.js` | Finalização | 7 |
| `api.cy.js` | API REST | 18 |
| **Total** | **100% Cobertura** | **48** |

---

## 🎪 **Cenários Especiais**

### ❌ **Testes de Erro**
1. **Login Inválido** → Mensagens de erro apropriadas
2. **Produto Sem Estoque** → Botão desabilitado e aviso visual
3. **Carrinho Vazio** → Checkout bloqueado
4. **Falha de Rede** → Timeout e recovery
5. **SQL Injection** → Proteção contra ataques

### ⚡ **Testes de Performance**
- 🎯 **Login**: < 1 segundo
- 🎯 **API Products**: < 500ms  
- 🎯 **Busca**: Instantânea
- 🎯 **Checkout**: 1s (simulação)

### 🔒 **Testes de Segurança**
- ✅ Validação de entrada
- ✅ Proteção SQL injection
- ✅ Autenticação obrigatória
- ✅ Sanitização de dados

---

## 📊 **Dados de Teste**

### 👤 **Usuário de Teste**
```json
{
  "email": "admin@empresa.com",
  "password": "123456",
  "company": "Empresa Teste"
}
```

### 🛍️ **Produtos Disponíveis**
| Produto | Preço | Estoque | Status |
|---------|-------|---------|--------|
| Notebook Dell | R$ 2.500,00 | 10 | ✅ Disponível |
| Mouse Logitech | R$ 150,00 | 50 | ✅ Disponível |
| Cadeira Ergonômica | R$ 800,00 | 5 | ✅ Disponível |
| Mesa de Escritório | R$ 1.200,00 | 3 | ✅ Disponível |
| Monitor 24" | R$ 900,00 | 0 | ❌ **Sem Estoque** |

---

## 🐛 **Gestão de Bugs**

### 🏷️ **Sistema de Labels**

**Por Severidade:**
- 🔴 **CRÍTICO** - Sistema inoperante
- 🟠 **ALTO** - Funcionalidade principal quebrada  
- 🟡 **MÉDIO** - Problema funcional menor
- 🟢 **BAIXO** - Cosmético/Melhoria

**Por Componente:**
- 🔐 **LOGIN** - Autenticação
- 🛍️ **PRODUTOS** - Catálogo  
- 🛒 **CARRINHO** - Compras
- 💳 **CHECKOUT** - Finalização

**Por Status:**
- 📋 **NOVO** → 👀 **EM ANÁLISE** → 🔧 **DESENVOLVIMENTO** → ✅ **FECHADO**

### 🔧 **Ferramentas Recomendadas**
- **Trello** - Board gratuito para tracking
- **Jira** - Ambiente profissional
- **GitHub Issues** - Projetos open source

---

## 📈 **Métricas Atuais**

```
🎯 Cobertura de Testes: 100%
📝 Casos Manuais: 16
🤖 Testes Automatizados: 48
🔌 Endpoints API: 18
⚡ Performance: ✅ Todos < 1s
🔒 Segurança: ✅ Validado
```

### 📊 **Distribuição de Testes**
```
Login:     5 testes (10%)
Produtos:  8 testes (17%)
Carrinho: 10 testes (21%)
Checkout:  7 testes (15%)
API:      18 testes (37%)
```

---

## 🎬 **Como Demonstrar**

### 🔄 **Fluxo Básico de Sucesso**
1. **Login** → admin@empresa.com / 123456
2. **Buscar** → "notebook" ou "informática"
3. **Adicionar** → Notebook + Mouse ao carrinho
4. **Checkout** → Finalizar pedido (aguardar 1s)
5. **Logout** → Sair do sistema

### ❌ **Cenários de Erro para Demonstrar**
1. **Login Inválido** → user@wrong.com / wrongpass
2. **Produto Sem Estoque** → Tentar adicionar Monitor 24"
3. **Checkout Vazio** → Tentar finalizar sem produtos
4. **Busca Vazia** → Procurar "produtoinexistente"

---

## 🔧 **Comandos Disponíveis**

```bash
# 🚀 Desenvolvimento
npm start                    # Servidor produção
npm run dev                  # Servidor com nodemon

# 🧪 Testes
npm test                     # Cypress interface
npm run test:headless        # Cypress CI/CD
npx cypress run --spec "arquivo.cy.js"  # Teste específico

# 🔍 Debug
node server.js               # Apenas backend
# DevTools → Application → Local Storage (verificar token/carrinho)
```

---

## 🚨 **Troubleshooting**

### ❗ **Problemas Comuns**

| Problema | Causa | Solução |
|----------|-------|---------|
| Porta 3000 ocupada | Servidor já rodando | `taskkill /f /im node.exe` |
| Testes falhando | Cache/estado | `cy.clearLocalStorage()` |
| Token expirado | Sessão perdida | Fazer logout/login |
| Carrinho vazio após reload | localStorage limpo | Comportamento normal |

### 🔧 **Validações de Ambiente**
```bash
# Verificar versões
node --version    # v22.15.0+
npm --version     # 10.0.0+
npx cypress --version  # 13.17.0+

# Verificar servidor
curl http://localhost:3000/api/products
```

---

## 📚 **Recursos Educacionais**

### 📖 **Documentação Incluída**
- ✅ Casos de teste manuais detalhados
- ✅ Templates de bug report
- ✅ Comandos customizados Cypress
- ✅ Estratégia de testes por funcionalidade
- ✅ Métricas e relatórios

### 🎓 **Conceitos Demonstrados**
- **Test-Driven Development** (TDD)
- **Behavior-Driven Development** (BDD)  
- **Page Object Model** (commands.js)
- **Test Data Management**
- **CI/CD Ready Tests**

---

## 📈 **Próximas Evoluções**

### 🚀 **Melhorias Técnicas**
- [ ] Database real (PostgreSQL)
- [ ] Autenticação OAuth 2.0
- [ ] Dashboard de métricas
- [ ] Notificações em tempo real
- [ ] App mobile React Native

### 🧪 **Expansão de Testes**
- [ ] Testes de acessibilidade (WCAG)
- [ ] Cross-browser (Safari, Firefox)
- [ ] Mobile testing (dispositivos)
- [ ] Load testing (JMeter)
- [ ] Security testing (OWASP)

### 🔄 **DevOps**
- [ ] GitHub Actions CI/CD
- [ ] Docker containerization
- [ ] Ambiente staging
- [ ] Monitoring (Prometheus)
- [ ] Logs centralizados

---

## 🤝 **Contribuição**

1. **Fork** o repositório
2. **Clone** sua fork
3. **Crie** uma branch (`feature/nova-funcionalidade`)
4. **Execute** os testes (`npm run test:headless`)
5. **Commit** suas mudanças
6. **Push** para a branch
7. **Abra** um Pull Request

### 📏 **Padrões de Commit**
```
feat: nova funcionalidade
fix: correção de bug  
test: adição/modificação de testes
docs: atualização de documentação
refactor: refatoração de código
```

---

## 📞 **Suporte**

### 💬 **Canais de Ajuda**
- 🐛 **Issues**: Para bugs e problemas
- 💡 **Discussions**: Para ideias e dúvidas
- 📧 **Email**: Para suporte direto
- 📚 **Wiki**: Documentação extendida

### 🔍 **Auto-Diagnóstico**
1. ✅ Servidor rodando na porta 3000?
2. ✅ Login funcionando?
3. ✅ Testes passando?
4. ✅ Console sem erros?

---

## 📄 **Licença**

**MIT License** - Livre para uso educacional e comercial.

---

## 🏆 **Créditos**

**Desenvolvido para fins educacionais de Quality Assurance**

> Sistema completo demonstrando as melhores práticas de testing manual e automatizado em um ambiente real de e-commerce B2B.

---

**🎯 Ready to test? Start with `npm start` and happy testing! 🚀**
