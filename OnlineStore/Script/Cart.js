// Cart.js
// This script handles the shopping cart functionality for the online store
// including adding items, updating totals, and checkout process.
// It also manages saving and loading the cart from localStorage.
// Ensure the DOM is fully loaded before running the script
// to avoid null references on elements.
// This script assumes the HTML structure matches the IDs used in the script.
// It also includes a checkout confirmation process and order history management.

// Make sure to include this script in your HTML file after the DOM elements are defined.
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
  // Ensure these buttons exist in your HTML
  var saveCartButton = document.getElementById("save-cart-button");
  var loadCartButton = document.getElementById("load-cart-button");
  var confirmationMessage = document.getElementById("confirmation-message");
  var itemCountElement = document.getElementById("item-count");
  var totalPriceElement = document.getElementById("total-price");
  document
    .getElementById("checkout-button")
    .addEventListener("click", handleCheckout);

  // Initialize cart from localStorage if available
  // Check if cart exists in localStorage
  if (!itemCountElement || !totalPriceElement) {
    console.error("Cart display elements not found in the DOM.");
    return;
  }
  // Load saved cart from localStorage
  // This will only run if the cart is not empty
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
  // Function to update cart totals and display.
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
  function updateTaxAndGrandTotalandshipping() {
    const shippingCost = 5.0; // Flat shipping cost
    document.getElementById("shipping-cost").textContent =
      shippingCost.toFixed(2) + " CAD";
    const taxRate = 0.15; // 15% tax
    const taxAmount = totalPrice * taxRate;
    const grandTotal = totalPrice + taxAmount + shippingCost;
    document.getElementById("shipping-cost").textContent =
      shippingCost.toFixed(2) + " CAD";

    document.getElementById("tax-amount").textContent =
      taxAmount.toFixed(2) + " CAD";
    document.getElementById("grand-total").textContent =
      grandTotal.toFixed(2) + " CAD";
  }
  // Call this function to update tax and grand total whenever the cart is updated
  updateTaxAndGrandTotal();

  // Function to clear the cart
  function clearCart() {
    Cart = [];
    updateCartTotals();
    updateCartDisplay();
    localStorage.removeItem("cart");
    alert("Cart cleared successfully!");
  }
  // Function to save the cart to localStorage
  // This function serializes the cart and saves it to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(Cart));
    alert("Cart saved successfully!");
  }
  // Function to load the cart from localStorage
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
  // Function to handle checkout process
  // This function checks if the cart has items, creates an order summary,
  function checkout() {
    if (TotalItems > 0) {
      const subtotal = Cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const taxRate = 0.15;
      const shippingCost = 5.0;
      const taxAmount = subtotal * taxRate;
      const grandTotal = subtotal + taxAmount + shippingCost;

      const orderSummary = {
        date: new Date().toISOString(),
        items: [...Cart], // Copy of cart items
        totalItems: TotalItems,
        subtotal: subtotal.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        shippingCost: shippingCost.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
        status: "completed",
        confirmationNumber: generateConfirmationNumber(),
      };

      // Save order to order history (fixed version)
      const existingOrders = JSON.parse(
        localStorage.getItem("OrderHistory") || "[]"
      );
      existingOrders.push(orderSummary);
      localStorage.setItem("OrderHistory", JSON.stringify(existingOrders));

      alert(
        `Order #${existingOrders.length} placed successfully!\n` +
          `${TotalItems} items totaling $${grandTotal.toFixed(
            2
          )} (incl. tax & shipping)\n` +
          `Confirmation #: ${orderSummary.confirmationNumber}\n` +
          `Thank you for your purchase!`
      );

      // redirect to the order-history page
      window.location.href = "../Pages/OrderHistory.html";
    } else {
      alert("Your cart is empty! Please add items before checkout.");
    }
  }

  // Function to generate a confirmation number
  // This function generates a unique confirmation number for the order.
  function generateConfirmationNumber() {
    return (
      "SYS-" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    );
  }
  // Function to handle checkout confirmation
  // This function checks if the cart is empty and shows a confirmation message.
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
  // In a real app, this would redirect to products page
  function continueShopping() {
    alert("Continuing shopping...");
    setTimeout(() => {
      window.location.href = "products.html";
    }, 3000);
  }
});

// order-history.js
document.addEventListener("DOMContentLoaded", function () {
  const OrderHistory = JSON.parse(localStorage.getItem("OrderHistory") || "[]");
  const historyContainer = document.getElementById("OrderHistory");

  if (OrderHistory.length === 0) {
    historyContainer.innerHTML = "<p>No past orders found.</p>";
    return;
  }
});
// Populate order history table
OrderHistory.forEach((order, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.confirmationNumber}</td>
            <td>${order.items.length}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
        `;
  historyContainer.appendChild(row);
});
