"use strict";

function checkout() {
  const Cart = JSON.parse(localStorage.getItem("Cart") || "[]");

  if (Cart.length > 0) {
    const totalPrice = Cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderSummary = {
      confirmationNumber: generateConfirmationNumber(),
      items: Cart,
      totalPrice: totalPrice,
      date: new Date().toISOString(),
    };

    const orderHistory = JSON.parse(
      localStorage.getItem("OrderHistory") || "[]"
    );
    orderHistory.push(orderSummary);
    localStorage.setItem("OrderHistory", JSON.stringify(orderHistory));

    // Clear cart if needed
    localStorage.setItem("Cart", JSON.stringify([]));

    // Redirect
    window.location.href = "../OrderHistory.html"; // Adjust path as needed
  } else {
    alert("Your cart is empty.");
  }
}
