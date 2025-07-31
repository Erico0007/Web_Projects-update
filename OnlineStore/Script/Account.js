"use strict";
// create an account
document.getElementById("createAccount").addEventListener("click", function () {
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    if (!fullname || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    // Here you would typically send the data to your server for account creation
    alert("Account created successfully!");
    // Reset form fields
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    // Redirect or update UI as needed
    window.location.href = "login.html"; // Redirect to login page after account creation
    

    // Create account logic here
});
