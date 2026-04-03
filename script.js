const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("fullscreen-menu");
const closeBtn = document.getElementById("menu-close");

/* OPEN MENU */
toggle.addEventListener("click", () => {
  toggle.classList.add("active");
  menu.classList.add("active");
});

/* CLOSE MENU (X BUTTON) */
closeBtn.addEventListener("click", () => {
  toggle.classList.remove("active");
  menu.classList.remove("active");
});

/* CLOSE ON LINK CLICK */
document.querySelectorAll(".fullscreen-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    toggle.classList.remove("active");
  });
});

/* HERO SECTION ANIMATION */
window.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");

  if (heroContent && heroImage) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateX(-30px)";
    heroImage.style.opacity = "0";
    heroImage.style.transform = "translateX(30px)";

    setTimeout(() => {
      heroContent.style.transition = "all 0.8s ease-out";
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateX(0)";

      heroImage.style.transition = "all 0.8s ease-out";
      heroImage.style.opacity = "1";
      heroImage.style.transform = "translateX(0)";
    }, 200);
  }
});

/* ABOUT US SCROLL-TRIGGER ANIMATION */
window.addEventListener("scroll", revealOnScroll);

function revealOnScroll() {
  const reveals = document.querySelectorAll(".about-content, .about-images");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

/* PRODUCT SECTION REVEAL */
window.addEventListener("scroll", revealProducts);

function revealProducts() {
  const cards = document.querySelectorAll(".product-card, .featured-product");

  cards.forEach((card, index) => {
    const windowHeight = window.innerHeight;
    const elementTop = card.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      // Small delay for each card to create a sequence
      setTimeout(() => {
        card.classList.add("active-product");
      }, index * 100);
    }
  });
}

/* SERVICES SECTION REVEAL */
const revealServices = () => {
  const serviceCards = document.querySelectorAll(".service-card");
  const triggerBottom = (window.innerHeight / 5) * 4;

  serviceCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      // Add a slight delay based on the card's index (0.2s, 0.4s, 0.6s)
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 200);
    }
  });
};

// Set initial state in JS (or do it in CSS)
document.querySelectorAll(".service-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "all 0.6s ease-out";
});

window.addEventListener("scroll", revealServices);

/* TRUST SECTION ANIMATION */
window.addEventListener("scroll", () => {
  const trustItems = document.querySelectorAll(".trust-item");
  const triggerBottom = (window.innerHeight / 5) * 4;

  trustItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, index * 150); // Staggered delay
    }
  });
});

// Set initial state
document.querySelectorAll(".trust-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-30px)";
  item.style.transition = "all 0.6s ease-out";
});

/* INQUIRY FORM SUBMISSION */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Changing button text to show it's working
    const btn = e.target.querySelector(".submit-btn");
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.style.opacity = "0.7";

    // Simulate a successful send
    setTimeout(() => {
      btn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
      btn.style.background = "#28a745"; // Green success color
      contactForm.reset();

      // Reset button back to normal after 3 seconds
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = ""; // Back to CSS default
        btn.style.opacity = "1";
      }, 3000);
    }, 1500);
  });
}

/* HEADER CTA SMOOTH SCROLL */
const headerCta = document.getElementById("header-cta");

if (headerCta) {
  headerCta.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href"); // Get #contact
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Smoothly scroll to the form
      window.scrollTo({
        top: targetSection.offsetTop - 80, // -80 to account for header height
        behavior: "smooth",
      });

      // Highlight the form briefly to show the user where to look
      setTimeout(() => {
        const formBox = document.querySelector(".inquiry-form-box");
        formBox.style.boxShadow = "0 0 30px rgba(255, 191, 0, 0.5)";
        formBox.style.transition = "box-shadow 0.5s ease";

        setTimeout(() => {
          formBox.style.boxShadow = "";
        }, 1000);
      }, 800);
    }
  });
}

/* CERTIFICATE PDF INTERACTION */
const certBtn = document.getElementById("cert-trigger");

if (certBtn) {
  certBtn.addEventListener("click", function (e) {
    // We don't preventDefault() because we want the PDF to open
    const originalText = this.querySelector("span").innerText;
    const span = this.querySelector("span");

    // Visual feedback that the system is "Verifying"
    span.innerText = "Verifying Credentials...";
    this.style.borderColor = "#28a745"; // Success green flash

    setTimeout(() => {
      span.innerText = originalText;
      this.style.borderColor = "";
    }, 3000);
  });
}

/* --- MAGNETIC LOGO SECTION --- */
// 1. Initialize the variable FIRST
const logoWrapper = document.getElementById("magnetic-logo");

// 2. Wrap the logic in a check to ensure the element exists
if (logoWrapper) {
  logoWrapper.addEventListener("mousemove", (e) => {
    // Only run on Desktop (wider than 992px)
    if (window.innerWidth > 992) {
      const { left, top, width, height } = logoWrapper.getBoundingClientRect();

      // Calculate movement
      const x = (e.clientX - (left + width / 2)) * 0.3;
      const y = (e.clientY - (top + height / 2)) * 0.3;

      // Select the internal parts
      const imgBox = logoWrapper.querySelector(".logo-img-box");
      const textBox = logoWrapper.querySelector(".logo-text");

      if (imgBox && textBox) {
        imgBox.style.transform = `translate(${x}px, ${y}px)`;
        textBox.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      }
    }
  });

  logoWrapper.addEventListener("mouseleave", () => {
    const imgBox = logoWrapper.querySelector(".logo-img-box");
    const textBox = logoWrapper.querySelector(".logo-text");

    if (imgBox && textBox) {
      imgBox.style.transform = "translate(0, 0)";
      textBox.style.transform = "translate(0, 0)";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const storyBtn = document.getElementById("story-trigger");
  const modal = document.getElementById("story-modal");
  const closeX = document.querySelector(".close-modal");
  const modalInner = document.getElementById("modal-content");

  if (storyBtn && modal) {
    // OPEN MODAL
    storyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      // Small delay to allow the 'display: flex' to register before animating
      setTimeout(() => {
        modalInner.classList.add("active");
      }, 10);
      document.body.style.overflow = "hidden";
    });

    // CLOSE MODAL FUNCTION
    const closeModalFunc = () => {
      modalInner.classList.remove("active");
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }, 400);
    };

    closeX.addEventListener("click", closeModalFunc);

    // CLOSE ON BACKGROUND CLICK
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModalFunc();
      }
    });
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   // --- UNIVERSAL MODAL FUNCTION ---
//   const setupModal = (triggerId, modalId, contentId, closeId) => {
//     const btn = document.getElementById(triggerId);
//     const modal = document.getElementById(modalId);
//     const content = document.getElementById(contentId);
//     const close = document.getElementById(closeId);

//     if (btn && modal) {
//       btn.onclick = (e) => {
//         e.preventDefault();
//         modal.style.display = "flex";
//         document.body.style.overflow = "hidden";
//         if (content) {
//           // Small delay to trigger the CSS transition
//           setTimeout(() => content.classList.add("active"), 10);
//         }
//       };

//       const hide = () => {
//         if (content) content.classList.remove("active");
//         setTimeout(() => {
//           modal.style.display = "none";
//           document.body.style.overflow = "auto";
//         }, 300);
//       };

//       if (close) close.onclick = hide;
//       window.addEventListener("click", (e) => {
//         if (e.target === modal) hide();
//       });
//     }
//   };

//   // ACTIVATE MODALS
//   setupModal(
//     "story-trigger",
//     "story-modal",
//     "modal-content",
//     "close-modal-btn",
//   );
//   setupModal("bulk-quote-trigger", "bulk-modal", "bulk-content", "close-bulk");
// });

// email send code

const contactForms = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector(".submit-btn");
    const originalText = btn.innerHTML;

    // Visual Feedback
    btn.innerHTML = "Sending...";
    btn.style.opacity = "0.7";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Detect the current language (defaults to 'en' if not found)
        const currentLang = localStorage.getItem("selectedLanguage") || "en";

        // Get the translated text from our translations object
        const title = translations[currentLang].success_title;
        const msg = translations[currentLang].success_msg;
        const btnText = translations[currentLang].success_btn;

        // Success State HTML
        contactForm.innerHTML = `
        <div style="text-align:center; padding: 30px; color: #1a0e2d;">
            <i class="fa-solid fa-paper-plane" style="font-size: 40px; color: #ffbf00; margin-bottom: 15px;"></i>
            <h3>${title}</h3>
            <p>${msg}</p>
            <button onclick="location.reload()" style="margin-top:20px; background:none; border:1px solid #ccc; cursor:pointer; padding:5px 10px; border-radius:5px;">
                ${btnText}
            </button>
        </div>`;
      } else {
        throw new Error();
      }
    } catch (err) {
      alert(
        "Sorry, there was an error. Please email us at info@indooceanix.com",
      );
      btn.innerHTML = originalText;
      btn.style.opacity = "1";
    }
  });
}

const manageModal = (btn, modal, content, closeBtn) => {
  if (!btn || !modal) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";

    // FIX: Lock the body but allow the modal to scroll
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (content) {
      setTimeout(() => content.classList.add("active"), 10);
    }
  });

  const hide = () => {
    if (content) content.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
      // FIX: Restore scrolling to both body and html
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }, 300);
  };

  if (closeBtn) closeBtn.onclick = hide;
  window.addEventListener("click", (e) => {
    if (e.target === modal) hide();
  });

  // FIX: Re-calculate if user rotates phone
  window.addEventListener("orientationchange", () => {
    if (modal.style.display === "flex") {
      modal.scrollTop = 0; // Reset scroll to top on rotate
    }
  });
};

function changeLanguage(lang) {
  // 1. Find all elements with the data-i18n attribute
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");

    // 2. Check if the translation exists in our JSON
    if (translations[lang] && translations[lang][key]) {
      // Handle placeholders for inputs (like the Contact Form)
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[lang][key];
      } else {
        // Handle normal text for <h1>, <p>, <a>, etc.
        el.innerText = translations[lang][key];
      }
    }
  });

  // 3. Save the choice so the site stays in Spanish when they refresh
  localStorage.setItem("selectedLanguage", lang);
}

// 4. Run this automatically when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // 1. Always force English on a fresh load/refresh
  const defaultLang = "en";

  // 2. Clear any old saved language so it doesn't interfere
  localStorage.removeItem("selectedLanguage");

  // 3. Apply the English language immediately
  changeLanguage(defaultLang);
});

// Update your changeLanguage function to NOT save to localStorage
function changeLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });

  // Update active button UI
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`btn-${lang}`);
  if (activeBtn) activeBtn.classList.add("active");

  // NOTE: We are NOT calling localStorage.setItem here anymore
  // because you want it to reset on every refresh.
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  // Only run "heavy" hover scripts for desktop
  initComplexHoverAnimations();
}
// Example for AOS library
AOS.init({
  disable: window.innerWidth < 768
});
