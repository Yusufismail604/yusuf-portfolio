// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

// Close mobile navigation after selecting a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Reveal elements as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
const typingText = document.getElementById("typing-text");

const roles = [
    "Websites",
    "Web Applications",
    "EPUB eBooks",
    "Digital Publications",
    "Digital Experiences"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    typingText.textContent = currentRole.substring(0, charIndex);

    if (!deleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        deleting = !deleting;

        if (!deleting) {
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, deleting ? 1500 : 400);
    }
}

typeEffect();