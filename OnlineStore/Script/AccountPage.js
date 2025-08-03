document.addEventListener("DOMContentLoaded", function () {
  // Authentication Check
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../Pages/Login.html";  // Redirect to login if not authenticated
    return;
  }

  // DOM Elements
  const profileForm = document.getElementById("profileUpdateForm");
  const firstNameInput = document.querySelector("#profile input[name='firstName']");
  const lastNameInput = document.querySelector("#profile input[name='lastName']");
  const emailInput = document.querySelector("#profile input[type='email']");
  const phoneInput = document.querySelector("#profile input[type='tel']");
  const logoutButton = document.getElementById("logoutButton");

  // Load user data with defaults
  const userData = JSON.parse(localStorage.getItem("userData")) || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    createdAt: new Date().toISOString()
  };

  // Populate form fields
  firstNameInput.value = userData.firstName || "";
  lastNameInput.value = userData.lastName || "";
  emailInput.value = userData.email || "";
  phoneInput.value = userData.phone || "";

  // Form Submission Handler
  if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      try {
        // Get updated values
        const updatedData = {
          firstName: firstNameInput.value.trim(),
          lastName: lastNameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          createdAt: userData.createdAt // Preserve original creation date
        };

        // Basic validation
        if (!updatedData.email || !validateEmail(updatedData.email)) {
          throw new Error("Please enter a valid email address");
        }

        // Save to localStorage
        localStorage.setItem("userData", JSON.stringify(updatedData));
        
        // Show success feedback
        showSuccessMessage("Profile updated successfully!");
        
        // Optional: Redirect after delay
        setTimeout(() => {
          window.location.href = "../Pages/AccountPage.html";
        }, 1000);
        
      } catch (error) {
        console.error("Profile update error:", error);
        showErrorMessage(error.message || "Failed to update profile. Please try again.");
      }
    });
  }

  // Logout Handler
  if (logoutButton) {
    logoutButton.addEventListener("click", function() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      window.location.href = "../Pages/Login.html";
    });
  }

  // Helper Functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showSuccessMessage(message) {
    // You can replace this with a toast notification or other UI element
    alert(message);
  }

  function showErrorMessage(message) {
    // You can replace this with a more sophisticated error display
    alert(message);
  }
});