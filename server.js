const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = 3000;
const JWT_SECRET = "simple-secret-key";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Banco de dados
const db = new sqlite3.Database(":memory:");

// Inicializar banco
db.serialize(() => {
  // Tabela de usuários
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    company TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabela de produtos
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    stock INTEGER,
    category TEXT,
    description TEXT
  )`);

  // Inserir dados de teste
  const hashedPassword = bcrypt.hashSync("123456", 10);
  db.run("INSERT INTO users (email, password, company) VALUES (?, ?, ?)", [
    "admin@empresa.com",
    hashedPassword,
    "Empresa Teste",
  ]);

  // Produtos de teste
  const products = [
    ["Notebook Dell", 2500.0, 10, "Informática", "Notebook para trabalho"],
    ["Mouse Logitech", 150.0, 50, "Informática", "Mouse sem fio"],
    ["Cadeira Ergonômica", 800.0, 5, "Móveis", "Cadeira para escritório"],
    ["Mesa de Escritório", 1200.0, 3, "Móveis", "Mesa em madeira"],
    ['Monitor 24"', 900.0, 0, "Informática", "Monitor Full HD"], // produto sem estoque
  ];

  products.forEach((product) => {
    db.run(
      "INSERT INTO products (name, price, stock, category, description) VALUES (?, ?, ?, ?, ?)",
      product
    );
  });
});

// Rotas da API
// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Erro interno" });
    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      res.json({ token, user: { email: user.email, company: user.company } });
    } else {
      res.status(401).json({ error: "Senha incorreta" });
    }
  });
});

// Listar produtos
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, products) => {
    if (err) return res.status(500).json({ error: "Erro interno" });
    res.json(products);
  });
});

// Buscar produtos
app.get("/api/products/search", (req, res) => {
  const { q } = req.query;
  const query = `%${q}%`;

  db.all(
    "SELECT * FROM products WHERE name LIKE ? OR category LIKE ?",
    [query, query],
    (err, products) => {
      if (err) return res.status(500).json({ error: "Erro interno" });
      res.json(products);
    }
  );
});

// Simular checkout
app.post("/api/checkout", (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Carrinho vazio" });
  }

  // Simular processamento
  setTimeout(() => {
    res.json({
      success: true,
      orderId: Date.now(),
      message: "Pedido realizado com sucesso!",
    });
  }, 1000);
});

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log("📧 Login teste: admin@empresa.com");
  console.log("🔑 Senha teste: 123456");
});
