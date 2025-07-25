// Cart.js
// This script handles the shopping cart functionality for the online store
// including adding items, updating totals, and checkout process.
// It also manages saving and loading the cart from localStorage.
// Ensure the DOM is fully loaded before running the script
// to avoid null references on elements.
// This script assumes the HTML structure matches the IDs used in the script.
// It also includes a checkout confirmation process and order history management.
document.addEventListener("DOMContentLoaded", function () {
  let Cart = [];
  let TotalItems = 0;
  let totalPrice = 0.0;

  // Get elements with correct IDs (matching your HTML)
  var checkoutButton = document.getElementById("checkout-button");
  var clearCartButton = document.getElementById("clear-cart-button");
  var continueShoppingButton = document.getElementById(
    "continue-shopping-button"
  );
  var saveCartButton = document.getElementById("save-cart-button");
  var loadCartButton = document.getElementById("load-cart-button");
  var confirmationMessage = document.getElementById("confirmation-message");
  var itemCountElement = document.getElementById("item-count");
  var totalPriceElement = document.getElementById("total-price");
  document
    .getElementById("checkout-button")
    .addEventListener("click", handleCheckout);

  // Initialize cart from localStorage if available
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    Cart = JSON.parse(savedCart);
    updateCartTotals();
    updateCartDisplay();
  }

  // Event listeners
  if (checkoutButton) {
    checkoutButton.addEventListener("click", checkout);
  }
  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  }
  if (continueShoppingButton) {
    continueShoppingButton.addEventListener("click", continueShopping);
  }
  if (saveCartButton) {
    saveCartButton.addEventListener("click", saveCart);
  }
  if (loadCartButton) {
    loadCartButton.addEventListener("click", loadCart);
  }

  // Add to cart function (modified to handle quantities)
  window.addToCart = function (name, price) {
    // Check if item already exists
    const existingItem = Cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      Cart.push({
        name: name,
        price: parseFloat(price),
        quantity: 1,
      });
    }

    updateCartTotals();
    updateCartDisplay();
    alert(`${name} added to cart!`);
  };

  function updateCartTotals() {
    TotalItems = Cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice = Cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  function updateCartDisplay() {
    if (itemCountElement) itemCountElement.textContent = TotalItems;
    if (totalPriceElement)
      totalPriceElement.textContent = totalPrice.toFixed(2) + " CAD";
  }

  function clearCart() {
    Cart = [];
    updateCartTotals();
    updateCartDisplay();
    localStorage.removeItem("cart");
    alert("Cart cleared successfully!");
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(Cart));
    alert("Cart saved successfully!");
  }

  function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      Cart = JSON.parse(savedCart);
      updateCartTotals();
      updateCartDisplay();
      alert("Cart loaded successfully!");
    } else {
      alert("No saved cart found.");
    }
  }

  function checkout() {
    if (TotalItems > 0) {
      // Create order summary
      const orderSummary = {
        date: new Date().toISOString(),
        items: [...Cart], // Copy of cart items
        totalItems: TotalItems,
        totalPrice: totalPrice,
        status: "completed",
      };

      // Save order to order history
      const orderHistory = JSON.parse(
        localStorage.getItem("orderHistory") || "[]"
      );
      orderHistory.push(orderSummary);
      localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

      // Show confirmation with order details
      alert(
        `Order #${orderHistory.length} placed successfully!\n` +
          `${TotalItems} items totaling $${totalPrice.toFixed(2)}\n` +
          `Thank you for your purchase!`
      );

      // Generate order confirmation HTML

      // In a real application, you would redirect to order confirmation page
      // window.location.href = `order-confirmation.html?orderId=${orderHistory.length}`;
    } else {
      alert("Your cart is empty! Please add items before checkout.");
    }
  }

  function generateConfirmationNumber() {
    return (
      "SYS-" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    );
  }

  function handleCheckout() {
    if (Cart.length === 0) {
      confirmationMessage.textContent = "Your cart is empty.";
      return;
    }

    const confirmationNumber = generateConfirmationNumber();
    alert(
      `Thank you for your purchase! Your confirmation number is: ${confirmationNumber}`
    );

    updateCartDisplay();
  }

  // Function to continue shopping
  function continueShopping() {
    // In a real app, this would redirect to products page
    alert("Continuing shopping...");
    setTimeout(() => {
      window.location.href = "products.html";
    }, 3000);
  }
}); // <-- closes the first DOMContentLoaded event listener

// order-history.js
document.addEventListener("DOMContentLoaded", function () {
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
  const historyContainer = document.getElementById("order-history");

  if (orderHistory.length === 0) {
    historyContainer.innerHTML = "<p>No past orders found.</p>";
    return;
  }
});
