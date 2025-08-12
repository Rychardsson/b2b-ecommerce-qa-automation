# 📋 Casos de Teste Manuais - E-commerce B2B

## 🔐 Funcionalidade: Login

### Caso 1: Login com credenciais válidas
**Objetivo:** Verificar se o usuário consegue fazer login com credenciais corretas
**Pré-condições:** Sistema inicializado
**Passos:**
1. Acessar a aplicação (http://localhost:3000)
2. Inserir email: admin@empresa.com
3. Inserir senha: 123456
4. Clicar em "Entrar"

**Resultado Esperado:** 
- Login realizado com sucesso
- Redirecionamento para tela principal
- Exibição dos dados da empresa no header

**Critérios de Aceitação:**
- ✅ Sistema autentica usuário
- ✅ Token é armazenado
- ✅ Interface muda para tela principal

---

### Caso 2: Login com credenciais inválidas
**Objetivo:** Verificar comportamento com credenciais incorretas
**Pré-condições:** Sistema inicializado
**Passos:**
1. Acessar a aplicação
2. Inserir email: usuario@inexistente.com
3. Inserir senha: senhaerrada
4. Clicar em "Entrar"

**Resultado Esperado:**
- Mensagem de erro exibida
- Usuário permanece na tela de login
- Campos limpos ou destacados

**Critérios de Aceitação:**
- ✅ Erro "Usuário não encontrado" exibido
- ✅ Não há redirecionamento
- ✅ Interface permanece responsiva

---

### Caso 3: Login com campos vazios
**Objetivo:** Validar campos obrigatórios
**Pré-condições:** Sistema inicializado
**Passos:**
1. Acessar a aplicação
2. Deixar campos email e senha vazios
3. Clicar em "Entrar"

**Resultado Esperado:**
- Validação HTML5 impede envio
- Mensagem de campo obrigatório

**Critérios de Aceitação:**
- ✅ Formulário não é submetido
- ✅ Campos obrigatórios destacados

---

## 🛍️ Funcionalidade: Catálogo de Produtos

### Caso 4: Visualização de produtos
**Objetivo:** Verificar exibição do catálogo
**Pré-condições:** Usuário logado
**Passos:**
1. Fazer login
2. Observar lista de produtos

**Resultado Esperado:**
- Produtos exibidos em grid
- Informações completas (nome, preço, estoque)
- Produtos sem estoque destacados

**Critérios de Aceitação:**
- ✅ 5 produtos exibidos
- ✅ Monitor 24" aparece como "Fora de estoque"
- ✅ Layout responsivo

---

### Caso 5: Busca de produtos
**Objetivo:** Testar funcionalidade de busca
**Pré-condições:** Usuário logado
**Passos:**
1. Digitar "notebook" no campo de busca
2. Clicar no botão de busca
3. Repetir com "mouse"
4. Buscar por "xyz" (inexistente)

**Resultado Esperado:**
- Busca por "notebook": 1 resultado
- Busca por "mouse": 1 resultado  
- Busca por "xyz": nenhum resultado

**Critérios de Aceitação:**
- ✅ Busca funciona por nome e categoria
- ✅ Resultados filtrados corretamente
- ✅ Busca vazia retorna todos produtos

---

## 🛒 Funcionalidade: Carrinho de Compras

### Caso 6: Adicionar produto ao carrinho
**Objetivo:** Verificar adição de produtos
**Pré-condições:** Usuário logado
**Passos:**
1. Clicar em "Adicionar ao Carrinho" no Notebook Dell
2. Verificar contador do carrinho
3. Adicionar Mouse Logitech
4. Verificar total

**Resultado Esperado:**
- Contador atualiza para 2 itens
- Total: R$ 2.650,00
- Produtos listados no carrinho

**Critérios de Aceitação:**
- ✅ Contador atualiza em tempo real
- ✅ Cálculo correto do total
- ✅ Produtos listados com preços

---

### Caso 7: Remover produto do carrinho
**Objetivo:** Testar remoção de itens
**Pré-condições:** Carrinho com produtos
**Passos:**
1. Adicionar 2 produtos ao carrinho
2. Clicar em "Remover" em um produto
3. Verificar atualização

**Resultado Esperado:**
- Produto removido da lista
- Contador e total atualizados
- Interface responsiva

**Critérios de Aceitação:**
- ✅ Remoção instantânea
- ✅ Cálculos corretos
- ✅ Estado persistido

---

### Caso 8: Produto fora de estoque
**Objetivo:** Verificar comportamento com estoque zero
**Pré-condições:** Usuário logado
**Passos:**
1. Localizar "Monitor 24""
2. Tentar adicionar ao carrinho
3. Verificar botão e mensagens

**Resultado Esperado:**
- Botão "Indisponível" desabilitado
- Produto marcado visualmente
- Não é possível adicionar

**Critérios de Aceitação:**
- ✅ Botão desabilitado
- ✅ Estilo visual diferenciado
- ✅ Mensagem "Fora de estoque"

---

## 💳 Funcionalidade: Checkout

### Caso 9: Finalizar pedido com sucesso
**Objetivo:** Testar processo de checkout
**Pré-condições:** Carrinho com produtos
**Passos:**
1. Adicionar produtos ao carrinho
2. Clicar em "Finalizar Pedido"
3. Aguardar processamento

**Resultado Esperado:**
- Mensagem de sucesso
- Número do pedido gerado
- Carrinho esvaziado

**Critérios de Aceitação:**
- ✅ Checkout processado
- ✅ Feedback visual claro
- ✅ Estado resetado

---

### Caso 10: Checkout com carrinho vazio
**Objetivo:** Validar checkout sem produtos
**Pré-condições:** Carrinho vazio
**Passos:**
1. Garantir carrinho vazio
2. Tentar clicar em "Finalizar Pedido"

**Resultado Esperado:**
- Botão desabilitado
- Impossível prosseguir

**Critérios de Aceitação:**
- ✅ Botão desabilitado
- ✅ Validação frontend

---

## 🔄 Funcionalidade: Logout

### Caso 11: Logout do sistema
**Objetivo:** Verificar saída do usuário
**Pré-condições:** Usuário logado
**Passos:**
1. Clicar em "Sair" no header
2. Verificar redirecionamento

**Resultado Esperado:**
- Retorno à tela de login
- Token removido
- Carrinho limpo

**Critérios de Aceitação:**
- ✅ Logout efetivo
- ✅ Dados removidos
- ✅ Estado resetado

---

## 📱 Teste de Usabilidade

### Caso 12: Responsividade
**Objetivo:** Verificar adaptação a diferentes telas
**Passos:**
1. Redimensionar janela do navegador
2. Testar em mobile (F12 > Device toolbar)
3. Verificar todos elementos

**Resultado Esperado:**
- Layout adapta-se bem
- Botões acessíveis
- Texto legível

---

## ⚡ Teste de Performance

### Caso 13: Tempo de resposta
**Objetivo:** Medir velocidade das operações
**Passos:**
1. Cronometrar login
2. Medir carregamento de produtos
3. Testar busca

**Resultado Esperado:**
- Login < 2 segundos
- Carregamento < 1 segundo
- Busca instantânea

---

## 🔄 Teste de Regressão

### Caso 14: Fluxo completo
**Objetivo:** Validar integração total
**Passos:**
1. Login
2. Buscar produtos
3. Adicionar ao carrinho
4. Finalizar pedido
5. Logout

**Resultado Esperado:**
- Fluxo sem interrupções
- Todas funcionalidades operantes
- Estado consistente

---

## ❌ Cenários de Erro

### Caso 15: Simulação de erro de rede
**Objetivo:** Testar comportamento offline
**Passos:**
1. Desconectar internet
2. Tentar fazer login
3. Verificar mensagens

**Resultado Esperado:**
- Erro de conexão tratado
- Mensagem amigável ao usuário

---

### Caso 16: Token expirado (manual)
**Objetivo:** Simular sessão expirada
**Passos:**
1. Fazer login
2. Limpar localStorage
3. Tentar acessar funcionalidades

**Resultado Esperado:**
- Redirecionamento para login
- Estado limpo
