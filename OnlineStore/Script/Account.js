"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const accountForm = document.getElementById("accountForm");
  const firstNameInput = document.getElementById("First Name");
  const lastNameInput = document.getElementById("Last Name");
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
  function validateFirstName() {
    const name = firstNameInput.value.trim();
    const helpText = document.getElementById("firstNameHelp");

    if (name.length < 2) {
      helpText.textContent = "First name must be at least 2 characters";
      helpText.className = "form-text error";
      firstNameInput.classList.add("is-invalid");
      firstNameInput.classList.remove("is-valid");
      return false;
    }

    if (!nameRegex.test(name)) {
      helpText.textContent =
        "First name can only contain letters, spaces, hyphens, and apostrophes";
      helpText.className = "form-text error";
      firstNameInput.classList.add("is-invalid");
      firstNameInput.classList.remove("is-valid");
      return false;
    }

    helpText.textContent = "";
    helpText.className = "form-text";
    firstNameInput.classList.remove("is-invalid");
    firstNameInput.classList.add("is-valid");
    return true;
  }

  function validateLastName() {
    const name = lastNameInput.value.trim();
    const helpText = document.getElementById("lastNameHelp");

    if (name.length < 2) {
      helpText.textContent = "Last name must be at least 2 characters";
      helpText.className = "form-text error";
      lastNameInput.classList.add("is-invalid");
      lastNameInput.classList.remove("is-valid");
      return false;
    }

    if (!nameRegex.test(name)) {
      helpText.textContent =
        "Last name can only contain letters, spaces, hyphens, and apostrophes";
      helpText.className = "form-text error";
      lastNameInput.classList.add("is-invalid");
      lastNameInput.classList.remove("is-valid");
      return false;
    }

    helpText.textContent = "";
    helpText.className = "form-text";
    lastNameInput.classList.remove("is-invalid");
    lastNameInput.classList.add("is-valid");
    return true;
  }

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
// Validate the Password 
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
  firstNameInput.addEventListener("input", validateFirstName);
  firstNameInput.addEventListener("blur", validateFirstName);
  lastNameInput.addEventListener("input", validateLastName);
  lastNameInput.addEventListener("blur", validateLastName);
  emailInput.addEventListener("input", validateEmail);
  emailInput.addEventListener("blur", validateEmail);
  passwordInput.addEventListener("input", validatePassword);
  passwordInput.addEventListener("blur", validatePassword);
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);
  confirmPasswordInput.addEventListener("blur", validateConfirmPassword);

  // Terms agreement button
  agreeTermsBtn.addEventListener("click", function () {
    termsCheck.checked = true;
  });

  // Form submission
  accountForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsChecked = termsCheck.checked;

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
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

    // Disable submit button during processing
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating account...';

    // Prepare user data
    const userData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage (simulating account creation)
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    // Show success message
    successToast.show();
    alert("Account created successuflly !");

    // Redirect to account page after delay
    setTimeout(() => {
      window.location.href = "../Pages/AccountPage.html";
    }, 2000);
  });
});
