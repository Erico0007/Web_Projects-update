"use strict";
// Contact us.js
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form"); // Changed to match HTML id
  const confirmationMessage = document.createElement("div"); // You need to create this or add it to your HTML

  // Handle form submission
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate form data
    if (name && email && message) {
      // Simulate sending the message (e.g., via an API)
      console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

      // Show confirmation message
      confirmationMessage.textContent =
        "Thank you for contacting us! We will get back to you soon.";
      contactForm.appendChild(confirmationMessage); // Add the message to the form
      contactForm.reset(); // Reset the form fields
    } else {
      alert("Please fill in all fields before submitting.");
    }
  });
});
