"use strict";

document.addEventListener("DOMContentLoaded", function () {
  //  Authentication Check
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../Pages/Login.html";
    return;
  }

  //  DOM Elements
  const profileForm = document.getElementById("profileForm");
  const firstNameInput = profileForm.querySelector("input[type='text']");
  const lastNameInput = profileForm.querySelectorAll("input[type='text']")[1];
  const emailInput = profileForm.querySelector("input[type='email']");
  const phoneInput = profileForm.querySelector("input[type='tel']");
  const logoutButton = document.getElementById("logoutButton");
  const container = document.querySelector(".container");
  const tbody = document.querySelector("#orders table tbody");
  const placeOrderBtn = document.querySelector(".placeOrderBtn"); //

  //  Load user data
  const userData = JSON.parse(localStorage.getItem("userData")) || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    createdAt: new Date().toISOString()
  };

  //  Load orders
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = orders.filter(order => order.email === userData.email); 

  //  Welcome Message
  const welcomeMessage = document.createElement("div");
  welcomeMessage.className = "alert alert-success mt-3";
  welcomeMessage.textContent = `Welcome, ${userData.firstName || "User"}!`;
  container.prepend(welcomeMessage);

  // Load and display orders if table exists
  if (ordersTable && tbody) {
    loadAndDisplayOrders(userData.email);
  }

  //  Populate form fields
  firstNameInput.value = userData.firstName || "";
  lastNameInput.value = userData.lastName || "";
  emailInput.value = userData.email || "";
  phoneInput.value = userData.phone || "";

  //  Form Submission Handler
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const updatedData = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        createdAt: userData.createdAt
      };

      if (!updatedData.email || !validateEmail(updatedData.email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (!updatedData.firstName || !updatedData.lastName) {
        throw new Error("First and last name are required.");
      }

      localStorage.setItem("userData", JSON.stringify(updatedData));
      showSuccessMessage("Profile updated successfully!");

      setTimeout(() => {
        window.location.href = "../Pages/AccountPage.html";
      }, 1000);
    } catch (error) {
      console.error("Profile update error:", error);
      showErrorMessage(error.message || "Failed to update profile.");
    }
  });

  //  Place Order from  Account 
  tbody.addEventListener("click", function (event) {
    if (event.target.classList.contains("placeOrderBtn")) {
      const index = event.target.getAttribute("data-index");
      const order = userOrders[index];

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      order.items.forEach(item => {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.push({ ...item });
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "../Pages/Cart.html";
    }
  });

  //  Optional Static Button Handler
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", function () {
      window.location.href = "../Pages/Cart.html";
    });
  }

  //  Logout Handler
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault();

      const confirmLogout = confirm("Are you sure you want to log out?");
      if (!confirmLogout) return;

      localStorage.removeItem("isLoggedIn");
      alert("You have been logged out.");
      window.location.href = "../Pages/Login.html";
    });
  }

  //  Display User Orders
  if (userOrders.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6" class="text-center">You have no orders yet.</td>`;
    tbody.appendChild(row);
  } else {
    userOrders.forEach((order, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${order.orderId}</td>
        <td>${new Date(order.date).toLocaleDateString()}</td>
        <td>${order.items.map(item => `${item.quantity} × ${item.name}`).join("<br>")}</td>
        <td>$${order.subtotal.toFixed(2)}</td>
        <td>$${order.total.toFixed(2)}</td>
        <td><button class="btn btn-sm btn-success placeOrderBtn" data-index="${index}">Place Order</button></td>
      `;
      tbody.appendChild(row);
    });
  }

  //  Helper Functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showSuccessMessage(message) {
    const alert = document.createElement("div");
    alert.className = "alert alert-success mt-3";
    alert.textContent = message;
    container.prepend(alert);
  }

  function showErrorMessage(message) {
    const alert = document.createElement("div");
    alert.className = "alert alert-danger mt-3";
    alert.textContent = message;
    container.prepend(alert);
  }
});

 function displayWelcomeMessage(user) {
    const welcomeMessage = document.createElement("div");
    welcomeMessage.className = "alert alert-success mt-3";
    welcomeMessage.innerHTML = `
      <h4>Welcome back, ${user.firstName || "User"}!</h4>
      <p class="mb-0">Member since ${new Date(user.createdAt).toLocaleDateString()}</p>
    `;
    container.prepend(welcomeMessage);
  }

function loadAndDisplayOrders(userEmail) {
    try {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const userOrders = orders.filter(order => 
        order.email === userEmail || order.customer?.email === userEmail
      );
      
      displayOrders(userOrders);
    } catch (e) {
      console.error("Error loading orders:", e);
      showErrorMessage("Failed to load order history. Please try again later.");
    }
  }
