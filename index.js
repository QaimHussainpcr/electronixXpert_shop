document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: "Smartphone", price: 699, category: "smartphones", image: "./images/smartphone.jpg" },
    { id: 6, name: "Iphone 14", price: 1099, category: "smartphones", image: "./images/iphone 14.webp" },
    { id: 11, name: "Smartphone", price: 1199, category: "smartphones", image: "./images/samsung s24.avif" },
    { id: 16, name: "Smartphone", price: 699, category: "smartphones", image: "./images/8aa8c1ef39137d965d9903e1acc86577.jpg" },
    { id: 4, name: "Tablet", price: 499, category: "smartphones", image: "./images/tab 1.jpg" },
    { id: 9, name: "Tablet", price: 499, category: "smartphones", image: "./images/tab2.jpg" },
    { id: 14, name: "Tablet", price: 499, category: "smartphones", image: "./images/tab 3.jpg" },
    { id: 19, name: "Tablet", price: 499, category: "smartphones", image: "./images/tab 4.jpg" },
    { id: 2, name: "Laptop", price: 999, category: "laptops", image: "./images/lap 1.jpg" },
    { id: 7, name: "Laptop", price: 899, category: "laptops", image: "./images/lap.webp" },
    { id: 12, name: "Laptop", price: 1199, category: "laptops", image: "./images/hp.jpg" },
    { id: 17, name: "Laptop", price: 2399, category: "laptops", image: "./images/dell.jpg" },
    { id: 3, name: "Headphones", price: 199, category: "accessories", image: "./images/headphone.jpg" },
    { id: 13, name: "Headphones", price: 199, category: "accessories", image: "./images/headphne 1.jpg" },
    { id: 8, name: "Headphones", price: 199, category: "accessories", image: "./images/headphne 5.avif" },
    { id: 18, name: "Headphones", price: 199, category: "accessories", image: "./images/headphone 2.jpg" },
    { id: 5, name: "Beats", price: 299, category: "accessories", image: "./images/headphone 3.jpg" },
    { id: 10, name: "Smart Watch", price: 499, category: "accessories", image: "./images/watch.jpg" },
    { id: 15, name: "Watch", price: 699, category: "accessories", image: "./images/watch 1.jpg" },
    { id: 20, name: "Watch", price: 199, category: "accessories", image: "./images/watch 2.jpg" },
    { id: 21, name: "Watch", price: 899, category: "accessories", image: "./images/watch 3.jpg" },
    { id: 22, name: "LCD", price: 2499, category: "accessories", image: "./images/lcd 1.jpg" },
    { id: 23, name: "LCD", price: 1399, category: "accessories", image: "./images/lcd 2.jpg" },
    { id: 24, name: "LCD", price: 2999, category: "accessories", image: "./images/lcd 4.png" },
  ];

  const productsGrid = document.querySelector('.products-grid');
  const cartContainer = document.getElementById('cart-items');
  const cartLink = document.getElementById('cart-link');
  const cartSection = document.getElementById('cart');
  const searchBar = document.getElementById('search-bar');
  const cartCount = document.getElementById('cart-count');
  const categoryButtons = document.querySelectorAll('.category-btn');

  const contactLink = document.getElementById('contact-link');
  const contactSection = document.getElementById('contact');
  const body = document.body;

  // Event listener to open the contact form
  contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Show the contact form and apply the blur effect to the background
    contactSection.classList.add('visible');
    body.classList.add('blur');
  });

  // Event listener to close the contact form when clicking outside the form
  contactSection.addEventListener('click', (e) => {
    if (e.target === contactSection) {
      // Hide the contact form and remove the blur effect from the background
      contactSection.classList.remove('visible');
      body.classList.remove('blur');
    }
  });
  

  let cart = [];

  const updateCartUI = () => {
    cartContainer.innerHTML = cart.length === 0
      ? "<p>Your cart is empty.</p>"
      : cart.map(item => `
        <div class="cart-item">
          <p>${item.name} - $${item.price} x ${item.quantity}</p>
          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
      `).join("");

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalElement);

    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const addToCart = (productId) => {
    const product = products.find(product => product.id === parseInt(productId));
    const cartItem = cart.find(item => item.id === product.id);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
  };

  const displayProducts = (filter = "all", search = "") => {
    productsGrid.innerHTML = "";

    const filteredProducts = products
      .filter(product => (filter === "all" ? true : product.category === filter))
      .filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

    if (filteredProducts.length === 0) {
      productsGrid.innerHTML = "<p>No products found.</p>";
      return;
    }

    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productsGrid.appendChild(productCard);
    });
  };

  const defaultCategoryButton = categoryButtons[0];
  if (defaultCategoryButton) {
    defaultCategoryButton.classList.add('active');
  }

  cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    cartSection.classList.toggle('hidden');
    document.body.classList.toggle('blur');
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      addToCart(e.target.dataset.id);
    }

    if (e.target.classList.contains('remove')) {
      const productId = parseInt(e.target.dataset.id);
      cart = cart.filter(item => item.id !== productId);
      updateCartUI();
    }
  });

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.category-btn.active')?.classList.remove('active');
      button.classList.add('active');
      displayProducts(button.dataset.category, searchBar.value.trim());
    });
  });

  searchBar.addEventListener('input', (e) => {
    displayProducts(document.querySelector('.category-btn.active').dataset.category, e.target.value.trim());
  });

  displayProducts();
  updateCartUI();
});
