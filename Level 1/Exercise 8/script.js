const products = [
  {
    id: 1,
    name: "Minimal Watch",
    price: 89,
    description: "Clean everyday watch with a modern minimalist look.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 159,
    description: "Comfortable over-ear headphones with rich sound.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 119,
    description: "Lightweight shoes designed for comfort and daily movement.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Backpack",
    price: 49,
    description: "Simple and durable backpack for school or travel.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Desk Lamp",
    price: 35,
    description: "Modern desk lamp with a warm and cozy finish.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Sneaker Classic",
    price: 95,
    description: "Classic streetwear sneaker with timeless styling.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80"
  }
];

const productGrid = document.querySelector("#productGrid");
const priceFilter = document.querySelector("#priceFilter");
const sortSelect = document.querySelector("#sortSelect");
const cartCount = document.querySelector("#cartCount");
const emptyState = document.querySelector("#emptyState");

const CART_KEY = "exercise8_cart";

let cart = loadCart();

function renderProducts() {
  let filteredProducts = [...products];

  const filterValue = priceFilter.value;
  const sortValue = sortSelect.value;

  if (filterValue !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      if (filterValue === "0-50") return product.price >= 0 && product.price <= 50;
      if (filterValue === "51-100") return product.price >= 51 && product.price <= 100;
      if (filterValue === "101-200") return product.price >= 101 && product.price <= 200;
      return true;
    });
  }

  if (sortValue === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  filteredProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img class="product-image" src="${product.image}" alt="${product.name}" />
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-bottom">
          <p class="price">$${product.price}</p>
          <button class="btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

function addToCart(productId) {
  cart.push(productId);
  saveCart();
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

priceFilter.addEventListener("change", renderProducts);
sortSelect.addEventListener("change", renderProducts);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".btn");
  if (!button) return;

  const productId = Number(button.dataset.id);
  addToCart(productId);
});

renderProducts();
updateCartCount();
