"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Get the order history from localStorage
    const orders = JSON.parse(localStorage.getItem("OrderHistory") || "[]");
    const tableBody = document.getElementById("order-history-body"); // Changed ID
    
    if (!tableBody) {
        console.error("Order history table body not found");
        return;
    }

    // Clear any existing content
    tableBody.innerHTML = '';

    if (orders.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No past orders found</td>
            </tr>
        `;
        return;
    }

    // Populate the table
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        
        // Format order date
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString() + ' ' + orderDate.toLocaleTimeString();
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.confirmationNumber}</td>
            <td>${formattedDate}</td>
            <td>${order.totalItems}</td>
            <td>$${order.subtotal}</td>
            <td>$${order.grandTotal}</td>
        `;
        tableBody.appendChild(row);
    });
});

// clear localStorage after displaying order history after 50  order history
if (localStorage.getItem("OrderHistory") && JSON.parse(localStorage.getItem("OrderHistory")).length >= 50) {
    localStorage.removeItem("OrderHistory");

    console.log("Order history cleared after reaching 50 orders.");
    document.getElementById("order-history-body").innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No past orders found</td>
        </tr>
    `;
}



