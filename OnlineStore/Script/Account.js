"use strict";
// Account functionality

// Get all the necessary DOM elements
document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const accountForm = document.getElementById("accountForm");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const termsCheck = document.getElementById("termsCheck");
  const submitBtn = document.getElementById("submitBtn");
  const agreeTermsBtn = document.getElementById("agreeTermsBtn");
  const successToast = new bootstrap.Toast(
    document.getElementById("successToast")
  );

  // Regular expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Zà-üÀ-Ü\s'-]{2,50}$/;

  // Validation functions
  function validateFullName() {
    const name = fullNameInput.value.trim();
    const helpText = document.getElementById("fullNameHelp");
    // NAME VALIDATION
    if (name.length < 2) {
      helpText.textContent = "Name must be at least 2 characters";
      helpText.className = "form-text error";
      fullNameInput.classList.add("is-invalid");
      fullNameInput.classList.remove("is-valid");
      return false;
    }
    // Check for valid characters
    if (!nameRegex.test(name)) {
      helpText.textContent =
        "Name can only contain letters, spaces, hyphens, and apostrophes";
      helpText.className = "form-text error";
      fullNameInput.classList.add("is-invalid");
      fullNameInput.classList.remove("is-valid");
      return false;
    }
    // If valid
    helpText.textContent = "";
    helpText.className = "form-text";
    fullNameInput.classList.remove("is-invalid");
    fullNameInput.classList.add("is-valid");
    return true;
  }
  // Validate email format
  function validateEmail() {
    const email = emailInput.value.trim();
    const helpText = document.getElementById("emailHelp");

    if (!emailRegex.test(email)) {
      helpText.textContent = "Please enter a valid email address";
      helpText.className = "form-text error";
      emailInput.classList.add("is-invalid");
      emailInput.classList.remove("is-valid");
      return false;
    }

    helpText.textContent = "";
    helpText.className = "form-text";
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    return true;
  }
  // Validate password strength
  function validatePassword() {
    const password = passwordInput.value;
    const helpText = document.getElementById("passwordHelp");
    const strengthBar = document.getElementById("passwordStrength");
    let strength = 0;

    // Reset strength bar
    strengthBar.className = "password-strength strength-0";

    if (password.length === 0) {
      helpText.textContent =
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.";
      helpText.className = "form-text";
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-valid");
      return false;
    }

    // Check password strength
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    // Update strength bar
    strengthBar.className = `password-strength strength-${strength - 1}`;

    if (password.length < 8) {
      helpText.textContent = "Password must be at least 8 characters";
      helpText.className = "form-text error";
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      return false;
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      helpText.textContent =
        "Password must include uppercase, lowercase, number, and special character";
      helpText.className = "form-text error";
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      return false;
    }

    helpText.textContent = "Strong password!";
    helpText.className = "form-text success";
    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
    return true;
  }

  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const helpText = document.getElementById("confirmPasswordHelp");

    if (confirmPassword !== password) {
      helpText.textContent = "Passwords do not match";
      helpText.className = "form-text error";
      confirmPasswordInput.classList.add("is-invalid");
      confirmPasswordInput.classList.remove("is-valid");
      return false;
    }

    if (password.length === 0) {
      helpText.textContent = "";
      helpText.className = "form-text";
      confirmPasswordInput.classList.remove("is-invalid");
      confirmPasswordInput.classList.remove("is-valid");
      return false;
    }

    helpText.textContent = "";
    helpText.className = "form-text";
    confirmPasswordInput.classList.remove("is-invalid");
    confirmPasswordInput.classList.add("is-valid");
    return true;
  }

  // Event listeners
  fullNameInput.addEventListener("input", validateFullName);
  fullNameInput.addEventListener("blur", validateFullName);

  emailInput.addEventListener("input", validateEmail);
  emailInput.addEventListener("blur", validateEmail);

  passwordInput.addEventListener("input", validatePassword);
  passwordInput.addEventListener("blur", validatePassword);

  confirmPasswordInput.addEventListener("input", validateConfirmPassword);
  confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

  agreeTermsBtn.addEventListener("click", function () {
    termsCheck.checked = true;
  });

  // Form submission
  accountForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsChecked = termsCheck.checked;

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isTermsChecked
    ) {
      if (!isTermsChecked) {
        const termsModal = new bootstrap.Modal(
          document.getElementById("termsModal")
        );
        termsModal.show();
      }
      return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating account...';

    //confirmed that account.js is loaded

    document.addEventListener("DOMContentLoaded", function () {
      alert("Account Created Successfully.");
    });

    // Simulate API call (replace with actual fetch)
    setTimeout(() => {
      // Show success message
      successToast.show();

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "../Pages/AccountPage.html";
      }, 6000);
    }, 1500);
  });
});

