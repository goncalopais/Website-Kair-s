// ---------------------------------------------------------------
// Página de um relógio: lê o "id" do link (relogio.html?id=...),
// procura esse relógio no array e escreve os dados na página.
// Sem id (ou com um id que não existe) fica o Submariner, que já
// está escrito no HTML.
// ---------------------------------------------------------------

const id = new URLSearchParams(window.location.search).get("id");
const relogio = relogios.find((r) => r.id === id) || relogios[0];

const nome = `${relogio.marca} ${relogio.modelo}`;

document.title = `${nome} | Kairós`;
document.getElementById("trilho-nome").textContent = nome;
document.getElementById("marca").textContent = relogio.marca;
document.getElementById("modelo").textContent = relogio.modelo;
document.getElementById("preco").textContent = formatarPreco(relogio.preco);
document.getElementById("descricao").textContent = relogio.descricao;

// Imagens (a principal e a da barra lateral)
const imagem = document.getElementById("imagem");
imagem.src = `img/relogios/${relogio.id}.svg`;
imagem.alt = `Ilustração do relógio ${nome}`;
document.getElementById("imagem-lateral").src = `img/relogios/${relogio.id}.svg`;
document.getElementById("legenda").textContent =
  `${nome}, referência ${relogio.referencia}, de ${relogio.ano}.`;

// Ficha técnica
document.getElementById("ficha-referencia").textContent = relogio.referencia;
document.getElementById("ficha-ano").textContent = relogio.ano;
document.getElementById("ficha-estado").textContent = relogio.estado;
document.getElementById("ficha-caixa").textContent = relogio.caixaPapeis ? "Sim" : "Não";
document.getElementById("ficha-material").textContent = relogio.material;
document.getElementById("ficha-diametro").textContent = `${relogio.diametro} mm`;
document.getElementById("ficha-movimento").textContent = `${relogio.movimento} · calibre ${relogio.calibre}`;
document.getElementById("ficha-reserva").textContent = `${relogio.reserva} horas`;
document.getElementById("ficha-estanque").textContent = `${relogio.estanque} m`;

// Campo escondido do formulário: diz a que relógio se refere a proposta
document.getElementById("campo-relogio").value = relogio.id;
document.getElementById("valor").placeholder = `Preço pedido: ${formatarPreco(relogio.preco)}`;

// "Também lhe pode interessar": 4 relógios da mesma marca ou de preço parecido
const semelhantes = relogios
  .filter((r) => r.id !== relogio.id)
  .sort((a, b) => {
    const mesmaMarcaA = a.marca === relogio.marca ? 0 : 1;
    const mesmaMarcaB = b.marca === relogio.marca ? 0 : 1;
    if (mesmaMarcaA !== mesmaMarcaB) return mesmaMarcaA - mesmaMarcaB;
    return Math.abs(a.preco - relogio.preco) - Math.abs(b.preco - relogio.preco);
  })
  .slice(0, 4);

const listaSemelhantes = document.getElementById("lista-semelhantes");
for (const r of semelhantes) {
  listaSemelhantes.append(criarCartao(r));
}
