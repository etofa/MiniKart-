const products = [
  { id: 1, name: "Smartphone", price: 15000 },
  { id: 2, name: "Headphones", price: 2000 },
  { id: 3, name: "Shoes", price: 3000 },
  { id: 4, name: "Watch", price: 5000 },
  { id: 5, name: "Backpack", price: 2500 },
];

const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-name">${product.name}</div>
      <div class="product-price">₹${product.price}</div>
      <button>Add to Cart</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      addToCart(product.id);
    });

    productsContainer.appendChild(card);
  });
}

function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty</p>`;
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span class="item-name">${item.name}</span>
      <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
      <span class="item-qty">${item.qty}</span>
      <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
      <span>₹${item.price * item.qty}</span>
    `;
    cartContainer.appendChild(div);
  });

  // add event listeners to + and - buttons
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      const action = btn.getAttribute("data-action");
      if (action === "increase") {
        addToCart(id);
      } else {
        removeFromCart(id);
      }
    });
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const cartItem = cart.find((item) => item.id === id);
  if (cartItem) {
    cartItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);
  if (index > -1) {
    cart[index].qty -= 1;
    if (cart[index].qty === 0) {
      cart.splice(index, 1);
    }
  }
  renderCart();
}

checkoutBtn.addEventListener("click", () => {
  alert("Thank you for your purchase! Checkout successful.");
  cart = [];
  renderCart();
});

renderProducts();
renderCart();
