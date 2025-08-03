"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");
  const resetBtn = document.getElementById("resetForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // Clear previous errors
      errorMessage.classList.add("d-none");

      // Validate inputs
      if (!email || !password) {
        showError("Please enter both email and password.");
        return;
      }

      // Simulate login - replace with actual authentication
      if (email === "user@example.com" && password === "password123") {
        // Store authentication state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify({
          fullName: "Test User",
          email: email,
          createdAt: new Date().toISOString()
        }));
        
        // Redirect to account page
        window.location.href = "AccountPage.html";
      } else {
        showError("Invalid email or password.");
      }
    });
  }

  // Reset form
  if (resetBtn) {
    resetBtn.addEventListener("click", function() {
      emailInput.value = "";
      passwordInput.value = "";
      errorMessage.classList.add("d-none");
    });
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("d-none");
  }

  // Input validation
  emailInput?.addEventListener("blur", validateEmail);
  passwordInput?.addEventListener("blur", validatePassword);

  function validateEmail() {
    const email = emailInput.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !re.test(email)) {
      showError("Please enter a valid email address.");
      return false;
    }
    return true;
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    if (password && password.length < 8) {
      showError("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  }
});