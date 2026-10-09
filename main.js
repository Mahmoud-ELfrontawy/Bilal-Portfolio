const root = document.documentElement;
const languageButton = document.querySelector("#language-toggle");
const themeButton = document.querySelector("#theme-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setLanguage(language) {
  const isArabic = language === "ar";
  root.lang = language;
  root.dir = isArabic ? "rtl" : "ltr";
  document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
    element.innerHTML = isArabic ? element.dataset.ar : element.dataset.en;
  });
  document.querySelectorAll("[data-en-label][data-ar-label]").forEach((element) => {
    element.setAttribute("aria-label", isArabic ? element.dataset.arLabel : element.dataset.enLabel);
  });
  languageButton.textContent = isArabic ? "EN" : "عربي";
  languageButton.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
  themeButton.setAttribute("aria-label", isArabic ? (root.dataset.theme === "light" ? "التبديل إلى الوضع الداكن" : "التبديل إلى الوضع الفاتح") : (root.dataset.theme === "light" ? "Switch to dark mode" : "Switch to light mode"));
  document.title = isArabic ? "بلال محمد — مختلف بطموحه" : "Bilal Mohamed — Built Different";
  localStorage.setItem("bilal-language", language);
}

function setTheme(theme) {
  root.dataset.theme = theme;
  const isLight = theme === "light";
  themeButton.setAttribute("aria-label", root.lang === "ar" ? (isLight ? "التبديل إلى الوضع الداكن" : "التبديل إلى الوضع الفاتح") : (isLight ? "Switch to dark mode" : "Switch to light mode"));
  themeButton.querySelector(".theme-glyph").textContent = isLight ? "☾" : "☼";
  localStorage.setItem("bilal-theme", theme);
}

languageButton.addEventListener("click", () => setLanguage(root.lang === "en" ? "ar" : "en"));
themeButton.addEventListener("click", () => setTheme(root.dataset.theme === "light" ? "dark" : "light"));

setLanguage(localStorage.getItem("bilal-language") === "ar" ? "ar" : "en");
setTheme(localStorage.getItem("bilal-theme") === "light" ? "light" : "dark");

if (!reducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero-copy > *, .hero-visual", {
    y: 28,
    duration: 0.85,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.12
  });
  gsap.utils.toArray(".story-grid > *, .manifesto-image, .manifesto-copy, .discipline-card, .contact-content > *").forEach((element) => {
    gsap.from(element, {
      y: 32,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true }
    });
  });
}