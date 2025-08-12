"use sttric";

// Complete translation dictionary for SYSTEMSTORES

document.addEventListener("DOMContentLoaded", function () {
  console.log("Translation script loaded");

  const translations = {
    fr: {
      // Common elements
      SYSTEMSTORES: "SYSTEMSTORES",
      "Best Online Shopping Experience":
        "Meilleure expérience d'achat en ligne",
      Home: "Accueil",
      Products: "Produits",
      Cart: "Panier",
      Contact: "Contact",
      "About Us": "À propos",
      "Order History": "Historique des commandes",
      Account: "Compte",
      Login: "Connexion",
      Logout: "Déconnexion",
      English: "Anglais",
      Français: "Français",
      "All rights reserved": "Tous droits réservés",
      "Privacy Policy": "Politique de confidentialité",
      "Call Us": "Appelez-nous",
      "Email Us": "Écrivez-nous",
      "© 2025": "© 2025",

      // About Us Page
      "Welcome to SYSTEMSTORES": "Bienvenue chez SYSTEMSTORES",
      "Founded in 2025 by Eric Ekra and Mamadou Barry":
        "Fondé en 2025 par Eric Ekra et Mamadou Barry",
      Canada: "Canada",
      "eco-friendly products": "produits écologiques",
      "We hope you enjoy our products":
        "Nous espérons que vous apprécierez nos produits",
      "If you have any questions or comments":
        "Si vous avez des questions ou des commentaires",
      "About Us": "À propos de nous",
      "your number one source for all things products":
        "votre source numéro un pour tous les produits",
      "We're dedicated to giving you the very best":
        "Nous nous engageons à vous offrir le meilleur",
      "dependability, customer service, and uniqueness":
        "fiabilité, service client et unicité",
      "passion drove him to do tons of research":
        "sa passion l'a poussé à faire des recherches approfondies",
      "world's most advanced products": "produits les plus avancés au monde",
      "We now serve customers all over Canada":
        "Nous desservons maintenant des clients partout au Canada",
      "turn our passion into our own website":
        "transformer notre passion en notre propre site web",

      // Account Pages
      "Create Your Account": "Créer votre compte",
      "First Name": "Prénom",
      "Last Name": "Nom de famille",
      "Email address": "Adresse e-mail",
      Password: "Mot de passe",
      "Confirm Password": "Confirmer le mot de passe",
      "I agree to the Terms and Conditions":
        "J'accepte les conditions générales",
      "Terms and Conditions": "Conditions générales",
      "Already have an account? Log in":
        "Vous avez déjà un compte? Connectez-vous",
      "Account created successfully! Redirecting...":
        "Compte créé avec succès! Redirection...",
      "Profile Information": "Informations du profil",
      "Update Profile": "Mettre à jour le profil",
      "Recent Orders": "Commandes récentes",
      "Quick Order": "Commande rapide",
      "Place Order": "Passer la commande",
      "Account Menu": "Menu du compte",
      Addresses: "Adresses",
      "Payment Methods": "Moyens de paiement",
      Settings: "Paramètres",
      "You must provide accurate and complete registration information":
        "Vous devez fournir des informations d'inscription exactes et complètes",
      "You are responsible for maintaining the confidentiality of your account credentials":
        "Vous êtes responsable de la confidentialité de vos identifiants de compte",
      "You agree to receive occasional marketing emails":
        "Vous acceptez de recevoir occasionnellement des e-mails marketing",
      "We reserve the right to terminate accounts":
        "Nous nous réservons le droit de résilier les comptes",
      "I Agree": "J'accepte",
      Close: "Fermer",

      // Cart Page
      "Your Cart": "Votre panier",
      "Review your selected items before checkout":
        "Vérifiez vos articles sélectionnés avant le paiement",
      "Add to Cart": "Ajouter au panier",
      "Remove from Cart": "Retirer du panier",
      "Cart Summary": "Résumé du panier",
      "Total items": "Nombre total d'articles",
      "Total price": "Prix total",
      Shipping: "Livraison",
      Tax: "Taxe",
      "Grand Total": "Total général",
      "Promo Code": "Code promo",
      "Enter promo code": "Entrez le code promo",
      Apply: "Appliquer",
      Checkout: "Paiement",
      Name: "Nom",
      Address: "Adresse",
      "Payment Method": "Méthode de paiement",
      "Select a payment method": "Sélectionnez un mode de paiement",
      "Credit Card": "Carte de crédit",
      PayPal: "PayPal",
      "Bank Transfer": "Virement bancaire",
      Cryptocurrency: "Cryptomonnaie",
      "Place Order": "Passer la commande",
      "Clear Cart": "Vider le panier",
      "Continue Shopping": "Continuer les achats",
      "Save Cart": "Sauvegarder le panier",
      "Load Cart": "Charger le panier",
      "Order Confirmation": "Confirmation de commande",
      "Order Details": "Détails de la commande",
      "Card Number": "Numéro de carte",
      "Expiry Date": "Date d'expiration",
      CVV: "CVV",
      "Name on Card": "Nom sur la carte",
      "You'll be redirected to PayPal": "Vous serez redirigé vers PayPal",
      "Bank transfer details will be provided":
        "Les détails du virement bancaire seront fournis",
      "We accept Bitcoin, Ethereum, and USDC":
        "Nous acceptons Bitcoin, Ethereum et USDC",

      // Contact Page
      "Get in Touch": "Contactez-nous",
      "If you have any questions or need assistance":
        "Si vous avez des questions ou besoin d'aide",
      Message: "Message",
      "Send Message": "Envoyer le message",

      // Forgot/Reset Password
      "Forgot Password": "Mot de passe oublié",
      "Enter your registered email": "Entrez votre e-mail enregistré",
      "Send Reset Link": "Envoyer le lien de réinitialisation",
      "Reset Your Password": "Réinitialiser votre mot de passe",
      "New Password": "Nouveau mot de passe",
      "Reset Password": "Réinitialiser le mot de passe",

      // Login Page
      "Enter your password": "Entrez votre mot de passe",
      "Forgot Password?": "Mot de passe oublié?",
      Reset: "Réinitialiser",

      // Order History
      "Past Orders": "Commandes passées",
      "Confirmation #": "N° de confirmation",
      Date: "Date",
      Subtotal: "Sous-total",

      // Products Page
      "Filter Products": "Filtrer les produits",
      "Category:": "Catégorie :",
      All: "Tous",
      "Beauty & Personal Care": "Beauté et soins personnels",
      Books: "Livres",
      Electronics: "Électroniques",
      "Home & Kitchen": "Maison et cuisine",
      "Price Range:": "Tranche de prix :",
      "Apply Filters": "Appliquer les filtres",
      "Reset Filters": "Réinitialiser les filtres",
      "High-quality item with excellent features":
        "Article de haute qualité avec d'excellentes caractéristiques",
      "A must-have product for everyday use":
        "Un produit indispensable pour un usage quotidien",
      "Top-rated item with premium quality":
        "Article bien noté avec une qualité premium",
      "Smartwatch with advanced features":
        "Montre intelligente avec des fonctionnalités avancées",
      "Eco-friendly product with great reviews":
        "Produit écologique avec d'excellents avis",
      "Affordable and reliable product": "Produit abordable et fiable",

      // Home Page
      "WELCOME TO SYSTEMSTORES": "BIENVENUE CHEZ SYSTEMSTORES",
      "Featured Products": "Produits vedettes",
      "Discover our top-rated items that customers love":
        "Découvrez nos articles les mieux notés que les clients adorent",
      "Product Comparison Table": "Tableau de comparaison des produits",
      Product: "Produit",
      Price: "Prix",
      Comments: "Commentaires",
    },
  };

  const browserLang = navigator.language.slice(0, 2);
  const supportedLangs = Object.keys(translations);
  let currentLang =
    localStorage.getItem("preferredLanguage") ||
    (supportedLangs.includes(browserLang) ? browserLang : "en");

  console.log("Language detection:", {
    browserLang,
    supportedLangs,
    currentLang,
  });

  // Apply translations
  function applyTranslations(lang) {
    console.log(`Applying ${lang} translations`);

    if (!translations[lang]) {
      console.warn(`Language '${lang}' not supported`);
      return;
    }

    const elements = document.querySelectorAll("[data-translate]");
    console.log(`Found ${elements.length} elements to translate`);

    elements.forEach((el) => {
      const key = el.getAttribute("data-translate");
      const translation = translations[lang][key];

      if (!translation) {
        console.warn(`No translation for key: ${key}`);
        return;
      }

      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.hasAttribute("placeholder")) {
          el.placeholder = translation;
        } else {
          el.value = translation;
        }
      } else if (el.tagName === "META") {
        el.setAttribute("content", translation);
      } else if (el.tagName === "TITLE") {
        document.title = translation;
      } else {
        el.textContent = translation;
      }
    });

    // Update active button
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Update HTML lang and direction
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }

  // Language switcher
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang && selectedLang !== currentLang) {
        currentLang = selectedLang;
        localStorage.setItem("preferredLanguage", selectedLang);
        applyTranslations(selectedLang);
      }
    });
  });

  // Initial load
  applyTranslations(currentLang);
});
