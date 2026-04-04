// Get elements
const cartItemsContainer = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const discountEl = document.getElementById("discount");
const shippingEl = document.getElementById("shipping");
const cartCountEl = document.getElementById("cart-count"); // <-- cart count badge

// Load cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // update nav badge whenever cart changes
}

// Update cart count in nav
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCountEl.textContent = count;
}

// Update summary totals
function updateSummary() {
  let subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = 0; // modify if needed
  const shipping = subtotal > 0 ? 0 : 0;

  subtotalEl.textContent = `$${subtotal}`;
  discountEl.textContent = `$${discount}`;
  shippingEl.textContent = shipping === 0 ? "FREE" : `$${shipping}`;
  totalEl.textContent = `$${subtotal - discount + shipping}`;
}

// Render cart items
function renderCart() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateSummary();
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="item-image-wrapper">
        <img src="${item.image}" alt="${item.name}" class="item-image">
      </div>
      <div class="item-details">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price">$${item.price}</p>
        <div class="quantity-selector">
          <button class="qty-btn qty-decrease">−</button>
          <input type="number" class="qty-input" value="${item.quantity}" min="1">
          <button class="qty-btn qty-increase">+</button>
        </div>
      </div>
      <div class="item-remove">
        <button class="remove-btn">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    // Quantity decrease
    cartItem.querySelector(".qty-decrease").addEventListener("click", () => {
      if (item.quantity > 1) item.quantity--;
      saveCart();
      cartItem.querySelector(".qty-input").value = item.quantity;
      updateSummary();
    });

    // Quantity increase
    cartItem.querySelector(".qty-increase").addEventListener("click", () => {
      item.quantity++;
      saveCart();
      cartItem.querySelector(".qty-input").value = item.quantity;
      updateSummary();
    });

    // Quantity input change
    cartItem.querySelector(".qty-input").addEventListener("change", (e) => {
      let value = parseInt(e.target.value);
      if (isNaN(value) || value < 1) value = 1;
      item.quantity = value;
      saveCart();
      e.target.value = item.quantity;
      updateSummary();
    });

    // Remove button
    cartItem.querySelector(".remove-btn").addEventListener("click", () => {
      cart.splice(index, 1); // remove from array
      saveCart();
      cartItem.remove(); // remove element without rerendering
      updateSummary();

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      }
    });
  });

  updateSummary();
  updateCartCount(); // update badge on render
}

// Initialize
renderCart();