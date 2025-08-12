"use strict"
document.addEventListener("DOMContentLoaded", () => {
  console.log("Scanning for missing data-translate attributes...");

  const ignoreTags = ["SCRIPT", "STYLE", "META", "TITLE", "LINK"];
  const elements = document.body.querySelectorAll("*");

  elements.forEach((el) => {
    if (
      ignoreTags.includes(el.tagName) ||
      el.hasAttribute("data-translate") ||
      el.children.length > 0 || // skip containers
      !el.textContent.trim()
    ) {
      return;
    }

    const text = el.textContent.trim();

    // Skip very short or numeric-only text
    if (text.length < 2 || /^\d+$/.test(text)) return;

    console.warn(`Missing data-translate:`, {
      tag: el.tagName,
      text: text,
      suggestion: `<${el.tagName.toLowerCase()} data-translate="${text}">${text}</${el.tagName.toLowerCase()}>`,
    });
  });

  console.log("Scan complete. Review suggestions above.");
});
