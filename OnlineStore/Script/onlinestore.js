"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const translations = {
    en: {
      welcome: "WELCOME TO SYSTEMSTORES",
      pastOrders: "Past Orders",
      orderId: "Order Id",
      totalItems: "Total Items",
      subtotal: "Subtotal",
      shippingCost: "Shipping Cost",
      grandTotal: "Grand Total",
      noOrdersFound: "No past orders found",
    },
    fr: {
      welcome: "BIENVENUE À SYSTEMSTORES",
      pastOrders: "Commandes Passées",
      orderId: "ID de Commande",
      totalItems: "Articles Totals",
      subtotal: "Sous-total",
      shippingCost: "Frais de Port",
      grandTotal: "Total Général",
      noOrdersFound: "Aucune commande passée trouvée",
    },
  };
  //get all language buttons
  const langButtons = document.querySelectorAll(".lang-btn");
  const langSwitcher = document.querySelector(".lang-switcher");

  // Set the initial language to English
  let currentLang = localStorage.getItem("lang") || "en";
  setCurrentLanguage(currentLang);

  // Add click event listeners to language buttons
  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      setCurrentLanguage(selectedLang);
    });
  });
  // Function to set the current language
  function setCurrentLanguage(lang) {
    // Update the current language
    langButtons.forEach((button) => {
      button.classList.remove("active");
      if (button.getAttribute("data-lang") === lang) {
        button.classList.add("active");
      }
    });
    //show /hide language switcher
    langSwitcher.style.display = lang === "en" ? "block" : "none";
    // Update the text content based on the selected language
    document.querySelector("header h1").textContent =
      translations[lang].welcome;
    document.getElementById("past-orders").textContent =
      translations[lang].pastOrders;
    document.getElementById("order-id").textContent =
      translations[lang].orderId;
    document.getElementById("total-items").textContent =
      translations[lang].totalItems;
    document.getElementById("subtotal").textContent =
      translations[lang].subtotal;
    document.getElementById("shipping-cost").textContent =
      translations[lang].shippingCost;
    document.getElementById("grand-total").textContent =
      translations[lang].grandTotal;
    document.getElementById("no-orders-found").textContent =
      translations[lang].noOrdersFound;
    // Save the current language to localStorage
    localStorage.setItem("lang", lang);
  }
});
