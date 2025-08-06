"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("resetPasswordForm");
  const emailInput = document.getElementById("email");
  const newPasswordInput = document.getElementById("newPassword");
  const messageBox = document.getElementById("resetMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const newPassword = newPasswordInput.value.trim();

    //  Validate email format
    if (!isValidEmail(email)) {
      messageBox.textContent = "Please enter a valid email address.";
      messageBox.className = "text-warning";
      return;
    }

    //  Validate password length
    if (newPassword.length < 8) {
      messageBox.textContent = "Password must be at least 8 characters long.";
      messageBox.className = "text-warning";
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser || storedUser.email !== email) {
      messageBox.textContent = "Email not found. Please try again.";
      messageBox.className = "text-danger";
      return;
    }

    //  Update password
    storedUser.password = newPassword;
    localStorage.setItem("userData", JSON.stringify(storedUser));

    messageBox.innerHTML = `<div class="alert alert-success">Password reset successfully! Redirecting to login...</div>`;

    setTimeout(() => {
      window.location.href = "Login.html";
    }, 2000);
  });

  //  Email validation function
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
