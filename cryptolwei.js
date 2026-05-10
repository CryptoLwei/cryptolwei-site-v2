document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll('.site-nav a, .hero-actions a[href^="#"]');
  const revealItems = document.querySelectorAll(".section, .info-card, .project-card, .hero-copy, .hero-visual");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.textContent = isOpen ? "Close" : "Menu";
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset + 2;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      if (nav && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        if (menuToggle) {
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.textContent = "Menu";
        }
      }
    });
  });

  const updateHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});

function copyCA() {
  const ca = document.getElementById("lweiCA").textContent.trim();
  if (ca === "Coming Soon") return;
  navigator.clipboard.writeText(ca).then(() => {
    const label = document.getElementById("copyLabel");
    label.textContent = "Copied!";
    setTimeout(() => { label.textContent = "Copy"; }, 2000);
  });
}