const products = {
  kimono: {
    title: "Kimono",
    description: "Uma modelagem ampla e versátil, pensada para sobreposições leves e para acompanhar diferentes momentos do dia.",
    level: "Iniciante",
    fabrics: "Linho, viscose ou crepe",
    color: "#6e3020",
    background: "#d9aa8d"
  },
  calca: {
    title: "Calça",
    description: "Uma peça de linhas limpas e caimento confortável para aprender a construir uma base essencial do guarda-roupa.",
    level: "Intermediário",
    fabrics: "Linho, sarja leve ou viscose",
    color: "#354032",
    background: "#bfc5b3"
  },
  saia: {
    title: "Saia",
    description: "Uma modelagem ajustável e fluida que convida quem está começando a transformar poucos elementos em uma peça marcante.",
    level: "Iniciante",
    fabrics: "Linho, tricoline ou viscose",
    color: "#684d31",
    background: "#d7c7ad"
  },
  vestido: {
    title: "Vestido",
    description: "Uma silhueta leve, de construção descomplicada, criada para explorar forma, movimento e acabamento em um único projeto.",
    level: "Intermediário",
    fabrics: "Viscose, cambraia ou linho leve",
    color: "#633c3b",
    background: "#cfaeaa"
  },
  camisa: {
    title: "Camisa",
    description: "Uma peça atemporal de volume suave para conhecer detalhes, aberturas e acabamentos que elevam a costura feita em casa.",
    level: "Intermediário",
    fabrics: "Tricoline, cambraia ou linho",
    color: "#34454a",
    background: "#b7cacb"
  }
};

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const productDialog = document.querySelector("#product-dialog");
const checkoutDialog = document.querySelector("#checkout-dialog");

const setMenu = (open) => {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  mobileMenu.hidden = !open;
  document.body.classList.toggle("menu-open", open);
};

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}, { passive: true });

const openProduct = (key) => {
  const product = products[key];
  const card = document.querySelector(`[data-product="${key}"]`);
  const illustration = card?.querySelector(".garment-illustration")?.cloneNode(true);

  if (!product || !illustration) return;

  productDialog.querySelector("[data-dialog-title]").textContent = product.title;
  productDialog.querySelector("[data-dialog-description]").textContent = product.description;
  productDialog.querySelector("[data-dialog-level]").textContent = product.level;
  productDialog.querySelector("[data-dialog-fabrics]").textContent = product.fabrics;

  const art = productDialog.querySelector("[data-dialog-art]");
  art.replaceChildren(illustration);
  art.style.color = product.color;
  art.style.background = product.background;
  productDialog.showModal();
};

document.querySelectorAll("[data-open-product]").forEach((button) => {
  button.addEventListener("click", () => openProduct(button.dataset.openProduct));
});

productDialog.querySelector("[data-close-dialog]").addEventListener("click", () => productDialog.close());

productDialog.querySelector("[data-open-checkout]").addEventListener("click", () => {
  productDialog.close();
  checkoutDialog.showModal();
});

checkoutDialog.querySelectorAll("[data-close-checkout]").forEach((button) => {
  button.addEventListener("click", () => checkoutDialog.close());
});

[productDialog, checkoutDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) dialog.close();
  });
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}
