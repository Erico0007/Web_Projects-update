"use strict";

//  This script handles product filtering based on category and price range
//  It updates the displayed products dynamically based on user selections
//  Ensure the DOM is fully loaded before running the script
//  This script assumes the HTML structure matches the IDs used in the script

//  Make sure to include this script in your HTML file after the DOM elements are defined
//  This script should be included after the product cards in your HTML
//
document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("category");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");
  const applyFiltersButton = document.getElementById("apply-filters");
  const products = document.querySelectorAll(".product-card");
  const resetFiltersButton = document.getElementById("reset-filters");

  // Initialize price range display
  priceRange.max = 2000; // Assuming the maximum price is 2000
  priceRange.value = 2000; // Set initial value to maximum
  priceValue.textContent = `$0 - $${priceRange.value}`;

  // Update price range display
  priceRange.addEventListener("input", function () {
    priceValue.textContent = `$0 - $${this.value}`;
  });

  // Function to get the price from a product card
  function getPrice(card) {
    const priceText = card.querySelector("p").textContent;
    return parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
  }
  // Function to get the category from a product card
  function getCategory(card) {
    const category = card.getAttribute("data-category");
    if (category) return category;

    if (
      categoryText.includes(" lotion") ||
      categoryText.includes("toner") ||
      categoryText.includes("listerine") ||
      imgAlt.includes("lotion") ||
      imgAlt.includes("toner") ||
      imgAlt.includes("listerine")
    ) {
      return "beauty";
    } else if (
      categoryText.includes("detective") ||
      imgAlt.includes("detective")
    ) {
      return "books";
    } else if (categoryText.includes("watch") || imgAlt.includes("watch")) {
      return "electronics";
    } else if (categoryText.includes("stove") || imgAlt.includes("stove")) {
      return "home";
    }
    return "unknown";
  }

  function applyFilters() {
    const selectedCategory = categorySelect.value;
    const maxPrice = parseFloat(priceRange.value);

    products.forEach((product) => {
      const productCategory = getCategory(product);
      const productPrice = getPrice(product);

      const isCategoryMatch =
        selectedCategory === "all" || productCategory === selectedCategory;
      const isPriceMatch = productPrice <= maxPrice;

      // Debugging output
      console.log(`Product: ${product.querySelector("h3").textContent}`);
      console.log(`Category: ${productCategory}, Price: ${productPrice}`);
      console.log(
        `Matches? Category: ${isCategoryMatch}, Price: ${isPriceMatch}`
      );

      product.style.display =
        isCategoryMatch && isPriceMatch ? "block" : "none";
    });
  }

  applyFiltersButton.addEventListener("click", applyFilters);
  resetFiltersButton.addEventListener("click", function () {
    categorySelect.value = "all";
    priceRange.value = 2000;
    priceValue.textContent = "$0 - $2000";
    applyFilters();
  });
});
