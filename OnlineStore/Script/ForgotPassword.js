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
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser || storedUser.email !== email) {
      messageBox.textContent = "Email not found. Please try again.";
      messageBox.className = "text-danger";
      return;
    }

    storedUser.password = newPassword;
    localStorage.setItem("registeredUser", JSON.stringify(storedUser));

    messageBox.textContent = "Password reset successfully! You can now log in.";
    messageBox.className = "text-success";

    setTimeout(() => {
      window.location.href = "Login.html";
    }, 2000);
  });
});