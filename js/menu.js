// Menu para ecrãs pequenos
const botao = document.querySelector("#menu-botao");
const menu = document.querySelector("#menu-principal");
const icone = document.querySelector("#menu-icone");

// Abrir e fechar o menu
function abrirMenu() {
  menu.classList.add("navegacao--aberta");
  botao.setAttribute("aria-expanded", "true");
  icone.textContent = "✕";
}

function fecharMenu() {
  menu.classList.remove("navegacao--aberta");
  botao.setAttribute("aria-expanded", "false");
  icone.textContent = "☰";
}

// Clique no botão
botao.addEventListener("click", () => {
  const aberto = botao.getAttribute("aria-expanded") === "true";
  if (aberto) {
    fecharMenu();
  } else {
    abrirMenu();
  }
});

// Tecla Escape fecha o menu
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
    fecharMenu();
    botao.focus();
  }
});

// Em ecrã largo o menu fica sempre visível
window.matchMedia("(min-width: 768px)").addEventListener("change", (evento) => {
  if (evento.matches) {
    fecharMenu();
  }
});
