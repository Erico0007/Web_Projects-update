"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const orderHistory = JSON.parse(localStorage.getItem("OrderHistory") || "[]");
  const historyContainer = document.getElementById("OrderHistory");

  if (orderHistory.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = "<td colspan='4'>No past orders found.</td>";
    tbody.appendChild(row);
    return;
  }
  orderHistory.forEach((order, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.confirmationNumber}</td>
            <td>${order.items.length}</td>
            <td>$${order.totalPrice.toFixed(2)}</td>
        `;
    historyContainer.appendChild(row);
  });
});
