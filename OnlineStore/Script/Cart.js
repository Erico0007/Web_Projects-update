// Cart.js
// This script handles the shopping cart functionality for the online store
// including adding items, updating totals, and checkout process.
// It also manages saving and loading the cart from localStorage.
// Ensure the DOM is fully loaded before running the script
// to avoid null references on elements.
// This script assumes the HTML structure matches the IDs used in the script.
// It also includes a checkout confirmation process and order history management.


document.addEventListener("DOMContentLoaded", function () {
  // Cart state
  let Cart = [];
  let appliedDiscount = 0;
  let freeShipping = false;

  // Promo codes
  const promoCodes = {
    "SAVE10": 0.10,       // 10% off
    "SAVE5": 5.00,        // $5 off
    "FREESHIP": "freeshipping"
  };

  // DOM elements
  const checkoutButton = document.getElementById("checkout-button");
  const clearCartButton = document.getElementById("clear-cart-button");
  const continueShoppingButton = document.getElementById("continue-shopping-button");
  const saveCartButton = document.getElementById("save-cart-button");
  const loadCartButton = document.getElementById("load-cart-button");
  const confirmationMessage = document.getElementById("confirmation-message");
  const itemCountElement = document.getElementById("item-count");
  const totalPriceElement = document.getElementById("total-price");
  const shippingCostElement = document.getElementById("shipping-cost");
  const taxAmountElement = document.getElementById("tax-amount");
  const grandTotalElement = document.getElementById("grand-total");
  const promoMessage = document.getElementById("promo-message");

  // Load cart from localStorage
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    Cart = JSON.parse(savedCart);
    updateCartDisplay();
  }

  // Event listeners
  if (checkoutButton) checkoutButton.addEventListener("click", checkout);
  if (clearCartButton) clearCartButton.addEventListener("click", clearCart);
  if (continueShoppingButton) continueShoppingButton.addEventListener("click", continueShopping);
  if (saveCartButton) saveCartButton.addEventListener("click", saveCart);
  if (loadCartButton) loadCartButton.addEventListener("click", loadCart);
  document.getElementById("apply-promo-button")?.addEventListener("click", applyPromoCode);

  // Add item to cart
  window.addToCart = function (name, price) {
    const existingItem = Cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      Cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCartDisplay();
    alert(`${name} added to cart!`);
  };

  // Remove item from cart
  window.removeFromCart = function (name) {
    const index = Cart.findIndex(item => item.name === name);
    if (index !== -1) {
      Cart[index].quantity--;
      if (Cart[index].quantity === 0) Cart.splice(index, 1);
      updateCartDisplay();
      alert(`${name} removed from cart!`);
    }
  };

  // Calculate totals
  function calculateCartTotals(cart, discount = 0, freeShipping = false) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = freeShipping ? 0 : 5.0;
    const tax = subtotal * 0.15;
    const discountAmount = typeof discount === "number" && discount < 1
      ? subtotal * discount
      : discount;
    const grandTotal = subtotal - discountAmount + tax + shipping;

    return {
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shipping,
      tax,
      discountAmount,
      grandTotal
    };
  }

  // Update cart display
  function updateCartDisplay() {
    const totals = calculateCartTotals(Cart, appliedDiscount, freeShipping);
    itemCountElement.textContent = totals.totalItems;
    totalPriceElement.textContent = totals.subtotal.toFixed(2) + " CAD";
    shippingCostElement.textContent = totals.shipping.toFixed(2) + " CAD";
    taxAmountElement.textContent = totals.tax.toFixed(2) + " CAD";
    grandTotalElement.textContent = totals.grandTotal.toFixed(2) + " CAD";
  }

  // Apply promo code
  function applyPromoCode() {
    const code = document.getElementById("promo-code").value.trim().toUpperCase();
    if (promoCodes.hasOwnProperty(code)) {
      const discount = promoCodes[code];
      if (discount === "freeshipping") {
        freeShipping = true;
        appliedDiscount = 0;
        promoMessage.textContent = "Free shipping applied!";
      } else if (typeof discount === "number" && discount < 1) {
        appliedDiscount = discount;
        promoMessage.textContent = `${discount * 100}% discount applied!`;
      } else {
        appliedDiscount = discount;
        promoMessage.textContent = `$${discount.toFixed(2)} discount applied!`;
      }
    } else {
      appliedDiscount = 0;
      freeShipping = false;
      promoMessage.textContent = "Invalid promo code.";
    }
    updateCartDisplay();
  }

  // Save cart
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(Cart));
    alert("Cart saved successfully!");
  }

  // Load cart
  function loadCart() {
    const saved = localStorage.getItem("cart");
    if (saved) {
      Cart = JSON.parse(saved);
      updateCartDisplay();
      alert("Cart loaded successfully!");
    } else {
      alert("No saved cart found.");
    }
  }

  // Clear cart
  function clearCart() {
    Cart = [];
    appliedDiscount = 0;
    freeShipping = false;
    localStorage.removeItem("cart");
    updateCartDisplay();
    alert("Cart cleared!");
  }

  // Checkout
  function checkout() {
    const totals = calculateCartTotals(Cart, appliedDiscount, freeShipping);
    if (totals.totalItems === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderSummary = {
      date: new Date().toISOString(),
      items: [...Cart],
      totalItems: totals.totalItems,
      subtotal: totals.subtotal.toFixed(2),
      taxAmount: totals.tax.toFixed(2),
      shippingCost: totals.shipping.toFixed(2),
      discount: totals.discountAmount.toFixed(2),
      grandTotal: totals.grandTotal.toFixed(2),
      status: "completed",
      confirmationNumber: generateConfirmationNumber()
    };

    const existingOrders = JSON.parse(localStorage.getItem("OrderHistory") || "[]");
    existingOrders.push(orderSummary);
    localStorage.setItem("OrderHistory", JSON.stringify(existingOrders));

    alert(
      `Order #${existingOrders.length} placed!\n` +
      `${totals.totalItems} items totaling $${totals.grandTotal.toFixed(2)}\n` +
      `Confirmation #: ${orderSummary.confirmationNumber}`
    );

    window.location.href = "../Pages/OrderHistory.html";
  }

  // Generate confirmation number
  function generateConfirmationNumber() {
    return "SYS-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  }

  // Continue shopping
  function continueShopping() {
    alert("Continuing shopping...");
    setTimeout(() => {
      window.location.href = "products.html";
    }, 2000);
  }
});

