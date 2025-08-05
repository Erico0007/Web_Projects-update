"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forgotPasswordForm");
  const emailInput = document.getElementById("email");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    //  Validate email format
    if (!isValidEmail(email)) {
      messageDiv.innerHTML = `<div class="alert alert-warning">Please enter a valid email address.</div>`;
      return;
    }

    //  Retrieve stored user
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (storedUser && email === storedUser.email) {
      //  Simulate sending a reset link
      localStorage.setItem("resetEmail", email); // Save email temporarily
      messageDiv.innerHTML = `<div class="alert alert-success">A reset link has been sent to your email (simulated).</div>`;

      //  Simulate redirect to ResetPassword.html
      setTimeout(() => {
        window.location.href = "../Pages/ResetPassword.html";
      }, 2000);
    } else {
      messageDiv.innerHTML = `<div class="alert alert-danger">Email not found. Please check and try again.</div>`;
    }
  });

  //  Email validation function
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
