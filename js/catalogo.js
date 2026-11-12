// Elementos da página
const listaRelogios = document.getElementById("lista-relogios");
const contagem = document.getElementById("contagem");
const campoPesquisa = document.getElementById("pesquisa");
const campoMarca = document.getElementById("marca");
const campoPreco = document.getElementById("preco-maximo");
const campoOrdem = document.getElementById("ordem");

// Opções do campo "Marca"
const marcas = [];
for (const relogio of relogios) {
  if (!marcas.includes(relogio.marca)) {
    marcas.push(relogio.marca);
  }
}
marcas.sort();

for (const marca of marcas) {
  const opcao = document.createElement("option");
  opcao.value = marca;
  opcao.textContent = marca;
  campoMarca.append(opcao);
}

// Marca vinda do link (ex.: catalogo.html?marca=Rolex)
const marcaNoLink = new URLSearchParams(window.location.search).get("marca");
if (marcaNoLink) {
  campoMarca.value = marcaNoLink;
}

// Filtra e ordena os relógios
function filtrarRelogios() {
  const texto = campoPesquisa.value.trim().toLowerCase();
  const marca = campoMarca.value;
  const precoMaximo = Number(campoPreco.value);

  const resultado = relogios.filter((relogio) => {
    const nome = `${relogio.marca} ${relogio.modelo} ${relogio.referencia}`.toLowerCase();
    if (texto && !nome.includes(texto)) return false;
    if (marca && relogio.marca !== marca) return false;
    if (precoMaximo && relogio.preco > precoMaximo) return false;
    return true;
  });

  if (campoOrdem.value === "preco-asc") {
    resultado.sort((a, b) => a.preco - b.preco);
  } else if (campoOrdem.value === "preco-desc") {
    resultado.sort((a, b) => b.preco - a.preco);
  } else if (campoOrdem.value === "ano") {
    resultado.sort((a, b) => b.ano - a.ano);
  }

  return resultado;
}

// Mostra os cartões na página
function mostrarRelogios() {
  const resultado = filtrarRelogios();
  listaRelogios.innerHTML = "";

  for (const relogio of resultado) {
    listaRelogios.append(criarCartao(relogio));
  }

  if (resultado.length === 0) {
    listaRelogios.innerHTML = `
      <li class="sem-resultados">
        <h2>Sem resultados</h2>
        <p class="texto-suave">Nenhum relógio corresponde à pesquisa. Experimente outra marca ou um preço mais alto.</p>
      </li>
    `;
  }

  contagem.textContent = `${resultado.length} de ${relogios.length} relógios`;
}

// Atualiza a lista quando um campo muda
campoPesquisa.addEventListener("input", mostrarRelogios);
campoMarca.addEventListener("change", mostrarRelogios);
campoPreco.addEventListener("change", mostrarRelogios);
campoOrdem.addEventListener("change", mostrarRelogios);

// O formulário não é enviado
document.getElementById("form-filtros").addEventListener("submit", (evento) => {
  evento.preventDefault();
});

// Primeira vez
mostrarRelogios();
