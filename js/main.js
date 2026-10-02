// Menú hamburguesa de Bulma (Bulma no trae JavaScript)
document.querySelectorAll(".navbar-burger").forEach((burger) => {
  burger.addEventListener("click", () => {
    const menu = document.getElementById(burger.dataset.target);
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
    burger.setAttribute("aria-expanded", burger.classList.contains("is-active"));
  });
});

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Animación de aparición al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Efecto máquina de escribir en el título (solo existe en index.html)
const title = document.querySelector(".hero-title");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (title && !reduceMotion) {
  const text = title.textContent.trim();
  title.setAttribute("aria-label", text);
  title.textContent = "";
  title.classList.add("typing");

  let i = 0;
  const timer = setInterval(() => {
    title.textContent = text.slice(0, ++i);
    if (i === text.length) clearInterval(timer);
  }, 90);
}

// ===== Hero interactivo =====
const heroVisual = document.getElementById("heroVisual");

if (heroVisual) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1) Rol que se escribe y se borra solo
  const roleEl = document.getElementById("role");
  const roles = ["estudiante de programación", "desarrollador web", "creador de videojuegos"];
  let r = 0, c = 0, deleting = false;

  function loopRole() {
    const word = roles[r];
    if (reduce) { roleEl.textContent = word; return; }
    c += deleting ? -1 : 1;
    roleEl.textContent = word.slice(0, c);
    let delay = deleting ? 40 : 90;
    if (!deleting && c === word.length) { deleting = true; delay = 1400; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
    setTimeout(loopRole, delay);
  }
  loopRole();

  // 2) Ventana de código con pestañas (edita los textos a tu gusto)
  const snippets = {
    aboutme:
`const barac = {
  nombre: "Barac Escobar",
  rol: "Estudiante de programación",
  ciudad: "Santiago, Chile",
  meta: "Crear cosas divertidas"
};`,
    skills:
`const skills = [
  "HTML", "CSS", "JavaScript",
  "C#", "Unity", "Git"
];

skills.forEach(aprender);`,
    hobbies:
`const hobbies = [
  "Videojuegos",
  "Animación digital",
  "Armar computadores"
];

while (vivo) { crear(); }`
  };

  const out = document.getElementById("codeOut");
  const tabs = document.querySelectorAll(".code-tab");
  let typer = null;

  function typeCode(text) {
    clearInterval(typer);
    if (reduce) { out.textContent = text; return; }
    out.textContent = "";
    let i = 0;
    typer = setInterval(() => {
      out.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(typer);
    }, 18);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      typeCode(snippets[tab.dataset.tab]);
    });
  });
  typeCode(snippets.aboutme);

  // 3) Parallax: los elementos se mueven suavemente con el mouse
  if (!reduce) {
    const layers = heroVisual.querySelectorAll("[data-depth]");
    const hero = document.getElementById("hero");

    hero.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      layers.forEach((el) => {
        const d = Number(el.dataset.depth);
        el.style.transform = `translate(${x * d}px, ${y * d}px)`;
      });
    });

    hero.addEventListener("mouseleave", () => {
      layers.forEach((el) => (el.style.transform = ""));
    });
  }
}