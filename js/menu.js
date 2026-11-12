// Menu responsivo
// Em ecrãs pequenos, o botão "Menu" mostra e esconde a navegação.
// A partir de 768 px (ver o CSS), o botão desaparece e o menu fica sempre visível.

const botao = document.querySelector("#menu-botao");
const menu = document.querySelector("#menu-principal");
const icone = document.querySelector("#menu-icone");

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

// Clicar no botão alterna entre aberto e fechado
botao.addEventListener("click", () => {
  const aberto = botao.getAttribute("aria-expanded") === "true";
  if (aberto) {
    fecharMenu();
  } else {
    abrirMenu();
  }
});

// A tecla Escape fecha o menu e devolve o foco ao botão
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
    fecharMenu();
    botao.focus();
  }
});

// Se a janela passar para ecrã largo com o menu aberto, repõe o estado inicial
window.matchMedia("(min-width: 768px)").addEventListener("change", (evento) => {
  if (evento.matches) {
    fecharMenu();
  }
});
