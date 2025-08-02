"use strict";
// Account functionality
// Get all the necessary DOM elements
document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
    return;
  }

  // Load user data if available
  const userData = JSON.parse(localStorage.getItem("userData"));
});

// Load user data if available
const userData = JSON.parse(localStorage.getItem("userData"));

// Populate form fields if user data exists
// Populate profile form if data exists
if (userData) {
  const nameParts = userData.fullName.split(" ");
  document.querySelector("#profile input[type='text']:nth-of-type(1)").value =
    nameParts[0] || "";
  document.querySelector("#profile input[type='text']:nth-of-type(2)").value =
    nameParts.slice(1).join(" ") || "";
  document.querySelector("#profile input[type='email']").value =
    userData.email || "";
  document.querySelector("#profile input[type='tel']").value =
    userData.phone || "";
}

//handle the profile  update
document
  .getElementById("profileUpdateForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get updated user data
    const updatedData = {
      fullName: `${
        this.querySelector("input[type='text']:nth-of-type(1)").value
      } ${
        this.querySelector("input[type='text']:nth-of-type(2)").value
      }`.trim(),
      email: this.querySelector("input[type='email']").value,
      phone: this.querySelector("input[type='tel']").value,
      createdAt: userData.createdAt,
    };

    // Store updated user data in localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    // Show success message
    alert("Profile updated successfully!");

    // Optionally redirect or update UI
    window.location.href = "AccountPage.html"; // Redirect to account page after update

    // Show feedback (optional, if you have a toast element)
    // const toast = new bootstrap.Toast(document.getElementById("updateToast"));
    // toast.show();
  });
// Log out 
 localStorage. removeItem("IsLoggedIn");
 window.location.href= "../OnlineStore.html";
 