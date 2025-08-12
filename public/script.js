class B2BEcommerce {
  constructor() {
    this.token = localStorage.getItem("token");
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.products = [];
    this.init();
  }

  init() {
    this.bindEvents();
    if (this.token) {
      this.showMainScreen();
      this.loadProducts();
    } else {
      this.showLoginScreen();
    }
    this.updateCartDisplay();
  }

  bindEvents() {
    // Login
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.login();
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      this.logout();
    });

    // Search
    document.getElementById("searchBtn").addEventListener("click", () => {
      this.searchProducts();
    });

    document.getElementById("searchInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.searchProducts();
      }
    });

    // Checkout
    document.getElementById("checkoutBtn").addEventListener("click", () => {
      this.checkout();
    });
  }

  async login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("loginError");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        this.token = data.token;
        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        this.showMainScreen();
        this.loadProducts();
        errorDiv.textContent = "";
      } else {
        errorDiv.textContent = data.error;
      }
    } catch (error) {
      errorDiv.textContent = "Erro de conexão";
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    this.cart = [];
    this.showLoginScreen();
  }

  showLoginScreen() {
    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("mainScreen").classList.add("hidden");
  }

  showMainScreen() {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainScreen").classList.remove("hidden");

    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById(
      "userInfo"
    ).textContent = `${user.company} (${user.email})`;
  }

  async loadProducts() {
    try {
      const response = await fetch("/api/products");
      this.products = await response.json();
      this.displayProducts(this.products);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  async searchProducts() {
    const query = document.getElementById("searchInput").value;

    if (!query.trim()) {
      this.displayProducts(this.products);
      return;
    }

    try {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(query)}`
      );
      const filteredProducts = await response.json();
      this.displayProducts(filteredProducts);
    } catch (error) {
      console.error("Erro na busca:", error);
    }
  }

  displayProducts(products) {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = `product-card ${
        product.stock === 0 ? "out-of-stock" : ""
      }`;

      productCard.innerHTML = `
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-category">Categoria: ${
                  product.category
                }</div>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="product-stock ${
                  product.stock === 0 ? "out-of-stock" : ""
                }">
                    ${
                      product.stock === 0
                        ? "Fora de estoque"
                        : `Estoque: ${product.stock}`
                    }
                </div>
                <button class="add-to-cart" 
                        data-product-id="${product.id}"
                        ${product.stock === 0 ? "disabled" : ""}>
                    ${
                      product.stock === 0
                        ? "Indisponível"
                        : "Adicionar ao Carrinho"
                    }
                </button>
            `;

      // Adicionar evento de click no botão
      const addButton = productCard.querySelector(".add-to-cart");
      addButton.addEventListener("click", () => {
        if (product.stock > 0) {
          this.addToCart(product);
        }
      });

      container.appendChild(productCard);
    });
  }

  addToCart(product) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCartDisplay();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCartDisplay();
  }

  updateCartDisplay() {
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");

    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2).replace(".", ",");

    cartItems.innerHTML = "";

    if (this.cart.length === 0) {
      cartItems.innerHTML = "<p>Carrinho vazio</p>";
      checkoutBtn.disabled = true;
    } else {
      checkoutBtn.disabled = false;
      this.cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                    <span>${item.name} (${item.quantity}x)</span>
                    <span>R$ ${(item.price * item.quantity)
                      .toFixed(2)
                      .replace(".", ",")}</span>
                    <button class="remove-item" data-product-id="${
                      item.id
                    }">Remover</button>
                `;

        const removeBtn = cartItem.querySelector(".remove-item");
        removeBtn.addEventListener("click", () => {
          this.removeFromCart(item.id);
        });

        cartItems.appendChild(cartItem);
      });
    }
  }

  async checkout() {
    if (this.cart.length === 0) return;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: this.cart }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ ${data.message}\nPedido #${data.orderId}`);
        this.cart = [];
        localStorage.removeItem("cart");
        this.updateCartDisplay();
      } else {
        alert(`❌ Erro: ${data.error}`);
      }
    } catch (error) {
      alert("❌ Erro de conexão durante o checkout");
    }
  }
}

// Inicializar aplicação
document.addEventListener("DOMContentLoaded", () => {
  new B2BEcommerce();
});
