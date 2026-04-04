const products = [
  { id: 1, name: "Silk Pyjamas", price: 300, image: "../images/pyjamas1.jpg" },
  { id: 2, name: "Bow Bonnet", price: 80, image: "../images/3rd bow bonnet.jpg" },
  { id: 3, name: "Cushion", price: 100, image: "../images/cushion.jpg" },
  { id: 4, name: "Fluffy Duvet", price: 450, image: "../images/pink duvet.jpg" },
  { id: 5, name: "Bow Bonnet", price: 80, image: "../images/2nd bow bonnet.jpg" },
  { id: 6, name: "Pyjamas", price: 300, image: "../images/pyjamas2.jpg" },
  { id: 7, name: "Pink Bonnet", price: 100, image: "../images/bonnet.jpg" },
  { id: 8, name: "Pyjamas", price: 300, image: "../images/pink duvet.jpg" },
];

// CART (LOAD FROM STORAGE)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SELECT ELEMENTS
const productList = document.getElementById("product-list");
const cartCountEl = document.getElementById("cart-count"); // cart icon badge

// DISPLAY PRODUCTS IN SHOP
// =======================
function displayProducts() {
  if (!productList) return;
  productList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");

    productCard.innerHTML = `
      <i class="fa-regular fa-heart heart"></i>
      <div class="img-box">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <h4 class="product-name">${product.name}</h4>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add To Cart</button>
    `;

    productList.appendChild(productCard);
  });
}

// ADD TO CART
// =======================
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
}

// SAVE CART & UPDATE BADGE
// =======================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// UPDATE CART ICON BADGE
// =======================
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
    cartCountEl.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// INITIALIZE
// =======================
displayProducts();
updateCartCount();