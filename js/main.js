// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Animación de aparición al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));