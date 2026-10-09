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

/* ── Scroll-triggered section animations ── */
if (!reducedMotion) {
  const animClasses = [
    ".anim-fade-up",
    ".anim-fade-left",
    ".anim-fade-right",
    ".anim-scale-in",
    ".anim-flip-up",
    ".anim-stagger-child",
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  document.querySelectorAll(animClasses.join(", ")).forEach((el) => observer.observe(el));

  /* ── Hero entrance (immediate, no scroll needed) ── */
  window.addEventListener("DOMContentLoaded", () => {
    const heroEls = document.querySelectorAll(".hero-copy > *, .hero-visual");
    heroEls.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.85s cubic-bezier(.22,.9,.36,1) ${i * 0.12}s, transform 0.85s cubic-bezier(.22,.9,.36,1) ${i * 0.12}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    });
  });

  /* ── Parallax on hero photo ── */
  const heroPhoto = document.querySelector(".hero-photo");
  if (heroPhoto) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.5) {
        heroPhoto.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    }, { passive: true });
  }
}