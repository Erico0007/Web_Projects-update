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
