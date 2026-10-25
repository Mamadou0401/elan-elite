/* ===========================
   ANIMATION FADE-IN
=========================== */
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    fadeObserver.observe(el);
});


/* ===========================
   NAVBAR : OMBRE + LIEN ACTIF AU SCROLL
   (le défilement fluide et le décalage sous la navbar
    sont gérés en CSS : scroll-behavior et scroll-margin-top)
=========================== */
const navbar = document.querySelector(".custom-nav");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    let current = sections[0].id;
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.id;
        }
    });

    // Bas de page : activer la dernière section (Contact)
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = sections[sections.length - 1].id;
    }

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


/* ===========================
   MENU MOBILE : FERMER APRÈS UN CLIC
=========================== */
const navMenu = document.getElementById("navMenu");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
    });
});