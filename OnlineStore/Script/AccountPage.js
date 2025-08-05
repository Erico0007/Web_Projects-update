
"use strict"


document.addEventListener("DOMContentLoaded", function () {
  // 🔐 Authentication Check
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../Pages/Login.html";
    return;
  }

  // 🌟 DOM Elements
  const profileForm = document.getElementById("profileForm");
  const firstNameInput = profileForm.querySelector("input[type='text']");
  const lastNameInput = profileForm.querySelectorAll("input[type='text']")[1];
  const emailInput = profileForm.querySelector("input[type='email']");
  const phoneInput = profileForm.querySelector("input[type='tel']");
  const logoutButton = document.getElementById("logoutButton");
  const container = document.querySelector(".container");

  // 📦 Load user data
  const userData = JSON.parse(localStorage.getItem("userData")) || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    createdAt: new Date().toISOString()
  };

  // 👋 Welcome Message
  const welcomeMessage = document.createElement("div");
  welcomeMessage.className = "alert alert-success mt-3";
  welcomeMessage.textContent = `Welcome , ${userData.firstName || "User"}!`;
  container.prepend(welcomeMessage);

  // 📝 Populate form fields
  firstNameInput.value = userData.firstName || "";
  lastNameInput.value = userData.lastName || "";
  emailInput.value = userData.email || "";
  phoneInput.value = userData.phone || "";

  // ✅ Form Submission Handler
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const updatedData = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        createdAt: userData.createdAt
      };

      // Basic validation
      if (!updatedData.email || !validateEmail(updatedData.email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (!updatedData.firstName || !updatedData.lastName) {
        throw new Error("First and last name are required.");
      }

      // Save updated data
      localStorage.setItem("userData", JSON.stringify(updatedData));

      showSuccessMessage("Profile updated successfully!");

      // Optional redirect
      setTimeout(() => {
        window.location.href = "../Pages/AccountPage.html";
      }, 1000);
    } catch (error) {
      console.error("Profile update error:", error);
      showErrorMessage(error.message || "Failed to update profile.");
    }
  });

  // 🚪 Logout Handler
  if (logoutButton) {
  logoutButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    window.location.href = "../Pages/Login.html"; // Redirect to login
  });
}

  // 🧠 Helper Functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showSuccessMessage(message) {
    const alert = document.createElement("div");
    alert.className = "alert alert-success mt-3";
    alert.textContent = message;
    container.prepend(alert);
  }

  function showErrorMessage(message) {
    const alert = document.createElement("div");
    alert.className = "alert alert-danger mt-3";
    alert.textContent = message;
    container.prepend(alert);
  }
});
