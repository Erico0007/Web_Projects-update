"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("resetPasswordForm");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (newPassword.value !== confirmPassword.value) {
      messageDiv.innerHTML = `<div class="alert alert-danger">Passwords do not match.</div>`;
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (storedUser) {
      storedUser.password = newPassword.value;
      localStorage.setItem("registeredUser", JSON.stringify(storedUser));
      messageDiv.innerHTML = `<div class="alert alert-success">Password has been reset successfully.</div>`;
    } else {
      messageDiv.innerHTML = `<div class="alert alert-danger">No user found. Please register first.</div>`;
    }
  });
});
