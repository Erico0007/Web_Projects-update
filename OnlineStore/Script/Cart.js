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

  // Simplified and corrected promo codes
  const promoCodes = {
    SAVE10: { type: "percent", value: 0.1 }, // 10% off
    SAVE5: { type: "fixed", value: 5.0 }, // $5 off
    SAVE20: { type: "percent", value: 0.2 }, // 20% off
    FREESHIP: { type: "shipping", value: 0 }, // Free shipping
  };

  // DOM elements with null checks
  const checkoutButton = document.getElementById("checkout-button");
  const clearCartButton = document.getElementById("clear-cart-button");
  const continueShoppingButton = document.getElementById(
    "continue-shopping-button"
  );
  const saveCartButton = document.getElementById("save-cart-button");
  const loadCartButton = document.getElementById("load-cart-button");
  const confirmationMessage = document.getElementById("confirmation-message");
  const itemCountElement = document.getElementById("item-count");
  const totalPriceElement = document.getElementById("total-price");
  const shippingCostElement = document.getElementById("shipping-cost");
  const taxAmountElement = document.getElementById("tax-amount");
  const grandTotalElement = document.getElementById("grand-total");
  const promoMessage = document.getElementById("promo-message");
  const checkoutForm = document.getElementById("checkout-form");
  const promoCodeInput = document.getElementById("promo-code");
  const paymentMethodSelect = document.getElementById("payment-method");
  const paymentInfoSections = document.querySelectorAll(".payment-info");

  // Load cart from localStorage with error handling
  try {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      Cart = JSON.parse(savedCart);
      updateCartDisplay();
    }
  } catch (e) {
    console.error("Error loading cart:", e);
  }

  // Event listeners with null checks
  if (checkoutButton) checkoutButton.addEventListener("click", checkout);
  if (clearCartButton) clearCartButton.addEventListener("click", clearCart);
  if (continueShoppingButton)
    continueShoppingButton.addEventListener("click", continueShopping);
  if (saveCartButton) saveCartButton.addEventListener("click", saveCart);
  if (loadCartButton) loadCartButton.addEventListener("click", loadCart);

  const applyPromoButton = document.getElementById("apply-promo-button");
  if (applyPromoButton)
    applyPromoButton.addEventListener("click", applyPromoCode);

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault();
      checkout();
    });
  }

  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener("change", function () {
      // Hide all payment info sections first
      document.querySelectorAll(".payment-info").forEach((section) => {
        section.style.display = "none";
      });

      // Show the selected payment method section
      const selectedMethod = this.value;
      if (selectedMethod) {
        const selectedSection = document.getElementById(
          `${selectedMethod}-info`
        );
        if (selectedSection) {
          selectedSection.style.display = "block";
        }
      }
    });
  }

  //format credit card number input
  // Format credit card inputs
  const cardNumberInput = document.getElementById("card-number");
  const expiryDateInput = document.getElementById("expiry-date");
  const cvvInput = document.getElementById("cvv");

  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\s+/g, "");
      if (value.length > 0) {
        value = value.match(new RegExp(".{1,4}", "g")).join(" ");
      }
      e.target.value = value;
    });
  }

  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }

  if (cvvInput) {
    cvvInput.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").substring(0, 4);
    });
  }

  // Add item to cart
  window.addToCart = function (name, price) {
    const existingItem = Cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      Cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCartDisplay();
    showMessage(`${name} added to cart!`);
  };

  // Remove item from cart
  window.removeFromCart = function (name) {
    const index = Cart.findIndex((item) => item.name === name);
    if (index !== -1) {
      Cart[index].quantity--;
      if (Cart[index].quantity === 0) Cart.splice(index, 1);
      updateCartDisplay();
      showMessage(`${name} removed from cart!`);
    }
  };

  // Calculate totals
  function calculateCartTotals(cart, discount = 0, freeShipping = false) {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = freeShipping ? 0 : 5.0;
    const tax = subtotal * 0.15;
    const discountAmount = discount;
    const grandTotal = subtotal - discountAmount + tax + shipping;

    return {
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shipping,
      tax,
      discountAmount,
      grandTotal,
    };
  }
  function validatePayment() {
    const paymentMethod = paymentMethodSelect?.value;
    if (!paymentMethod) {
      showMessage("Please select a payment method", "error");
      return false;
    }

    // Credit card specific validation
    if (paymentMethod === "credit-card") {
      const cardNumber = document
        .getElementById("card-number")
        ?.value.replace(/\s/g, "");
      const expiryDate = document.getElementById("expiry-date")?.value;
      const cvv = document.getElementById("cvv")?.value;
      const cardName = document.getElementById("card-name")?.value;

      if (!cardNumber || cardNumber.length < 16) {
        showMessage("Please enter a valid card number", "error");
        return false;
      }

      if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        showMessage("Please enter a valid expiry date (MM/YY)", "error");
        return false;
      }

      if (!cvv || cvv.length < 3) {
        showMessage("Please enter a valid CVV", "error");
        return false;
      }

      if (!cardName) {
        showMessage("Please enter the name on card", "error");
        return false;
      }
    }

    return true;
  }

  // Update cart display
  function updateCartDisplay() {
    const totals = calculateCartTotals(Cart, appliedDiscount, freeShipping);
    if (itemCountElement) itemCountElement.textContent = totals.totalItems;
    if (totalPriceElement)
      totalPriceElement.textContent = totals.subtotal.toFixed(2) + " CAD";
    if (shippingCostElement)
      shippingCostElement.textContent = totals.shipping.toFixed(2) + " CAD";
    if (taxAmountElement)
      taxAmountElement.textContent = totals.tax.toFixed(2) + " CAD";
    if (grandTotalElement)
      grandTotalElement.textContent = totals.grandTotal.toFixed(2) + " CAD";
  }

  // Apply promo code
  function applyPromoCode() {
    const code = promoCodeInput
      ? promoCodeInput.value.trim().toUpperCase()
      : "";
    if (promoCodes.hasOwnProperty(code)) {
      const promo = promoCodes[code];
      if (promo.type === "shipping") {
        freeShipping = true;
        appliedDiscount = 0;
        showMessage("Free shipping applied!", "success");
      } else if (promo.type === "percent") {
        freeShipping = false;
        appliedDiscount = calculateCartTotals(Cart).subtotal * promo.value;
        showMessage(`${promo.value * 100}% discount applied!`, "success");
      } else if (promo.type === "fixed") {
        freeShipping = false;
        appliedDiscount = promo.value;
        showMessage(`$${promo.value.toFixed(2)} discount applied!`, "success");
      }
    } else {
      appliedDiscount = 0;
      freeShipping = false;
      showMessage("Invalid promo code.", "error");
    }
    updateCartDisplay();
  }

  // Save cart
  function saveCart() {
    try {
      localStorage.setItem("cart", JSON.stringify(Cart));
      showMessage("Cart saved successfully!", "success");
    } catch (e) {
      showMessage("Failed to save cart: " + e.message, "error");
      console.error(e);
    }
  }

  // Load cart
  function loadCart() {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        Cart = JSON.parse(saved);
        updateCartDisplay();
        showMessage("Cart loaded successfully!", "success");
      } else {
        showMessage("No saved cart found.", "info");
      }
    } catch (e) {
      showMessage("Error loading cart: " + e.message, "error");
      console.error(e);
    }
  }

  // Clear cart
  function clearCart() {
    Cart = [];
    appliedDiscount = 0;
    freeShipping = false;
    try {
      localStorage.removeItem("cart");
      updateCartDisplay();
      showMessage("Cart cleared!", "success");
    } catch (e) {
      showMessage("Error clearing cart: " + e.message, "error");
      console.error(e);
    }
  }

  // Checkout -
  function checkout() {
    // Validate form inputs
    const name = document.getElementById("name")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const paymentMethod = document.getElementById("payment-method")?.value;

    if (!validatePayment()) {
      return;
    }

    if (!name || !address || !email || !paymentMethod) {
      showMessage("Please fill in all required fields", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address", "error");
      return;
    }

    const totals = calculateCartTotals(Cart, appliedDiscount, freeShipping);
    if (totals.totalItems === 0) {
      showMessage("Your cart is empty!", "error");
      return;
    }
    if (!paymentMethod) {
      showMessage("Please select a payment method", "error");
      return;
    }

    // Create order summary
    const orderSummary = {
      date: new Date().toISOString(),
      customer: {
        name,
        address,
        email,
        paymentMethod,
      },
      items: [...Cart],
      totalItems: totals.totalItems,
      subtotal: totals.subtotal.toFixed(2),
      taxAmount: totals.tax.toFixed(2),
      shippingCost: totals.shipping.toFixed(2),
      discount: totals.discountAmount.toFixed(2),
      grandTotal: totals.grandTotal.toFixed(2),
      status: "completed",
      confirmationNumber: generateConfirmationNumber(),
      promoCodeUsed: promoCodeInput?.value.trim() || null,
    };

    try {
      // Save order to history
      const existingOrders = JSON.parse(
        localStorage.getItem("OrderHistory") || "[]"
      );
      existingOrders.push(orderSummary);
      localStorage.setItem("OrderHistory", JSON.stringify(existingOrders));
      showMessage("Order placed successfully!", "success");
      

      // Clear cart
      Cart = [];
      appliedDiscount = 0;
      freeShipping = false;
      localStorage.removeItem("cart");
      updateCartDisplay();

      // Show confirmation
      const confirmationMsg = `Thank you, ${name}!\n\nOrder Summary:\nItems: ${
        totals.totalItems
      }\nSubtotal: $${totals.subtotal.toFixed(
        2
      )} CAD\nDiscount: $${totals.discountAmount.toFixed(
        2
      )} CAD\nTax: $${totals.tax.toFixed(
        2
      )} CAD\nShipping: $${totals.shipping.toFixed(
        2
      )} CAD\nTotal: $${totals.grandTotal.toFixed(2)} CAD\n\nConfirmation #: ${
        orderSummary.confirmationNumber
      }`;

      showMessage(confirmationMsg, "success");

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "../Pages/OrderHistory.html";
      }, 3000);
    } catch (e) {
      showMessage("Error processing order: " + e.message, "error");
      console.error(e);
    }
  }

  // Helper function to show messages
  function showMessage(message, type = "info") {
    if (confirmationMessage) {
      confirmationMessage.textContent = message;
      confirmationMessage.className = type; // Add CSS class for styling
    } else {
      alert(message); // Fallback
    }
  }

  // Generate confirmation number
  function generateConfirmationNumber() {
    return "SYS-" + Date.now().toString().slice(-6);
  }

  // Continue shopping
  function continueShopping() {
    showMessage("Continuing shopping...", "info");
    setTimeout(() => {
      window.location.href = "products.html";
    }, 2000);
  }
});

// Order 
