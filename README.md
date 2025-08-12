# 🚀 E-commerce B2B - Sistema de Testes

## 📋 Visão Geral

Sistema simples de e-commerce B2B desenvolvido para demonstrar práticas de QA, incluindo testes manuais e automatizados.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript vanilla
- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite (em memória)
- **Testes E2E**: Cypress
- **Autenticação**: JWT + bcrypt

## ⚡ Início Rápido

### 1. Instalação

```bash
# Instalar dependências
npm install
```

### 2. Iniciar o Sistema

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Ou modo produção
npm start
```

### 3. Acessar a Aplicação

- **URL**: http://localhost:3000
- **Login teste**: admin@empresa.com
- **Senha teste**: 123456

### 4. Executar Testes Automatizados

```bash
# Interface visual do Cypress
npm test

# Modo headless (CI/CD)
npm run test:headless
```

## 🎯 Funcionalidades Implementadas

### ✅ Funcionais

- [x] Login/Logout com validação
- [x] Catálogo de produtos com busca
- [x] Carrinho de compras persistente
- [x] Checkout com simulação de processamento
- [x] Gestão de estoque (produtos fora de estoque)
- [x] API REST completa

### ✅ Técnicas

- [x] Autenticação JWT
- [x] Validação de entrada
- [x] Tratamento de erros
- [x] Storage local
- [x] Interface responsiva

## 🧪 Estratégia de Testes

### 📝 Testes Manuais

Localizados em `/testes-manuais/`:

- **casos-de-teste.md**: 16 casos de teste detalhados
- **template-bugs.md**: Templates para registro de bugs

### 🤖 Testes Automatizados

Localizados em `/cypress/e2e/`:

- **login.cy.js**: Testes de autenticação
- **produtos.cy.js**: Testes do catálogo
- **carrinho.cy.js**: Testes do carrinho
- **checkout.cy.js**: Testes de finalização
- **api.cy.js**: Testes de API e performance

## 🎯 Cenários Especiais Implementados

### ❌ Cenários de Erro

1. **Login inválido**: Credenciais incorretas
2. **Produto fora de estoque**: Monitor 24" sem estoque
3. **Carrinho vazio**: Checkout bloqueado
4. **Erro de rede**: Simulação de falhas de conexão
5. **Timeout**: Processamento lento simulado

### ⚡ Testes de Performance

- Login < 1 segundo
- Carregamento de produtos < 500ms
- Busca instantânea
- Checkout com timeout simulado (1s)

### 🔒 Testes de Segurança

- Validação contra SQL injection
- Sanitização de entrada
- Autenticação obrigatória

## 📊 Dados de Teste

### 👤 Usuários

| Email             | Senha  | Empresa       |
| ----------------- | ------ | ------------- |
| admin@empresa.com | 123456 | Empresa Teste |

### 🛍️ Produtos

| Nome               | Preço       | Estoque | Categoria   |
| ------------------ | ----------- | ------- | ----------- |
| Notebook Dell      | R$ 2.500,00 | 10      | Informática |
| Mouse Logitech     | R$ 150,00   | 50      | Informática |
| Cadeira Ergonômica | R$ 800,00   | 5       | Móveis      |
| Mesa de Escritório | R$ 1.200,00 | 3       | Móveis      |
| Monitor 24"        | R$ 900,00   | 0       | Informática |

## 🐛 Gestão de Bugs

### Ferramentas Recomendadas

- **Trello**: Board gratuito para tracking
- **Jira**: Para ambientes profissionais
- **GitHub Issues**: Para projetos open source

### Labels Sugeridas

- 🔴 CRÍTICO | 🟠 ALTO | 🟡 MÉDIO | 🟢 BAIXO
- 🔐 LOGIN | 🛍️ PRODUTOS | 🛒 CARRINHO | 💳 CHECKOUT
- 📋 NOVO | 👀 EM ANÁLISE | 🔧 DESENVOLVIMENTO | ✅ FECHADO

## 📈 Métricas e Relatórios

### Cobertura de Testes

- **Funcionalidades**: 100% cobertas
- **Casos de uso**: 16 cenários manuais
- **Testes E2E**: 25+ testes automatizados
- **Testes de API**: 15+ endpoints testados

### Tipos de Teste

- **Funcionais**: Login, CRUD, Fluxos
- **Usabilidade**: Interface, Responsividade
- **Performance**: Tempo de resposta
- **Segurança**: Validação, Autenticação
- **Regressão**: Fluxo completo

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor com auto-reload
npm start               # Servidor produção

# Testes
npm test                # Cypress interface
npm run test:headless   # Cypress headless
node server.js          # Apenas backend

# Debug
# Abrir DevTools -> Application -> Local Storage
# Verificar tokens JWT e carrinho
```

## 🚨 Cenários de Falha Comum

### 1. Token Expirado

**Sintoma**: Redirecionamento inesperado para login
**Solução**: Implementar refresh automático

### 2. Produto Sem Estoque

**Sintoma**: Botão "Indisponível" desabilitado
**Comportamento**: Esperado - não é bug

### 3. Carrinho Vazio no Checkout

**Sintoma**: Botão checkout desabilitado
**Comportamento**: Esperado - validação funcional

### 4. Erro de Conexão

**Sintoma**: Mensagens "Erro de conexão"
**Teste**: Desconectar internet e tentar operações

## 📝 Próximos Passos

### Melhorias Sugeridas

1. **Persistência real**: Migrar para PostgreSQL
2. **Autenticação avançada**: OAuth, 2FA
3. **Relatórios**: Dashboard de vendas
4. **Notificações**: Email, Push
5. **Mobile**: App React Native
6. **CI/CD**: GitHub Actions

### Testes Adicionais

1. **Acessibilidade**: WCAG compliance
2. **Cross-browser**: Safari, Firefox
3. **Mobile**: Testes em dispositivos
4. **Load testing**: JMeter, K6
5. **Security**: OWASP Top 10

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Execute os testes
4. Faça o commit das mudanças
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas:

- Abra uma issue no GitHub
- Verifique os logs do console
- Execute os testes para validar o ambiente

---

**Desenvolvido para fins educacionais de QA**  
Sistema completo de e-commerce B2B com foco em testes manuais e automatizados.
