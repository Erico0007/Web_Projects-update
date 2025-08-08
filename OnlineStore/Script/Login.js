"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");
  const resetBtn = document.getElementById("resetForm");

  loginForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    errorMessage.classList.add("d-none");

    if (!email || !password) {
      showError("Please enter both email and password.");
      return;
    }

    // Use the correct key: "userData"
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    console.log("Stored user:", storedUser);

    console.log("Entered email:", email);
    console.log("Entered password:", password);

    if (storedUser && email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "../Pages/AccountPage.html";
    } else {
      showError("Invalid email or password.");
    }
  });

  resetBtn?.addEventListener("click", function () {
    emailInput.value = "";
    passwordInput.value = "";
    errorMessage.classList.add("d-none");
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("d-none");
  }
});
