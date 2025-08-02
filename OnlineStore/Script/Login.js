"use strict";

//Login functionality
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-button");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  // Event listener for login button
  if (loginButton) {
    loginButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password || !username) {
        errorMessage.textContent =
          "Please enter both email, password, and username.";
        return;
      }

      // Simulate a login process (replace with actual authentication logic)
      if (
        email === "user@example.com" &&
        password === "password123" &&
        username === "username"
      ) {
        // Successful login
        window.location.href = "Account.html";
      } else {
        errorMessage.textContent = "Invalid email, password, or username.";
      }
    });
  }
});

// Clear error message on input change
document.querySelectorAll("#username, #email, #password").forEach((input) => {
  input.addEventListener("input", function () {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorMessage.textContent = "";
    }
  });
});
// Reset form fields
document.getElementById("resetForm").addEventListener("click", function () {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("error-message").textContent = "";
  // Optionally redirect or update UI
  window.location.href = "login.html"; // Redirect to login page after reset
});
// validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
// Validate email format on input
document.getElementById("email").addEventListener("input", function () {
  const email = this.value;
  if (!validateEmail(email)) {
    document.getElementById("error-message").textContent =
      "Please enter a valid email address.";
  } else {
    document.getElementById("error-message").textContent = "";
  }
});
// Validate password strength
function validatePassword(password) {
  return password.length >= 10; // Example: minimum length of 10 characters
}
// Validate password strength on input
document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  if (!validatePassword(password)) {
    document.getElementById("error-message").textContent =
      "Password must be at least 10 characters long.";
  } else {
    document.getElementById("error-message").textContent = "";
  }
});
// Validate username format
function validateUsername(username) {
  const re = /^[a-zA-Z0-9_]{3,20}$/; // Example: alphanumeric and underscores, 3-20 characters
  return re.test(String(username));
}

// Validate username format on input
document.getElementById("username").addEventListener("input", function () {
  const username = this.value;
  if (!validateUsername(username)) {
    document.getElementById("error-message").textContent =
      "Username must be 3-20 characters long and can only contain letters, numbers, and underscores.";
  } else {
    document.getElementById("error-message").textContent = "";
  }
});
// Redirect to account creation page
document
  .getElementById("createAccountLink")
  .addEventListener("click", function () {
    window.location.href = "../Pages/AccountPage.html"; // Redirect to account creation page
  });
