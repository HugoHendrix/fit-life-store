const carrinhoElement = document.getElementById('itensCarrinho');
let valorTotal = 0;

function adicionarAoCarrinho(produtoNome, produtoValor) {
  const itemCarrinho = document.createElement('li');
  itemCarrinho.classList.add('list-group-item');
  itemCarrinho.innerHTML = `${produtoNome} - R$ ${produtoValor.toFixed(2)} <button class="btn btn-danger btn-sm ms-2" onclick="removerDoCarrinho(this, ${produtoValor})">Remover</button>`;
  carrinhoElement.appendChild(itemCarrinho);
  valorTotal += produtoValor;
  document.getElementById('total').textContent = valorTotal.toFixed(2);

  // Salvar o carrinho no localStorage
  salvarCarrinhoNoLocalStorage();
}

function removerDoCarrinho(botaoRemover, valorProduto) {
  const itemCarrinho = botaoRemover.parentElement;
  carrinhoElement.removeChild(itemCarrinho);
  valorTotal -= valorProduto;
  document.getElementById('total').textContent = valorTotal.toFixed(2);

  // Salvar o carrinho no localStorage
  salvarCarrinhoNoLocalStorage();
}

function salvarCarrinhoNoLocalStorage() {
  // Obter todos os itens do carrinho
  const itensCarrinho = carrinhoElement.querySelectorAll('.list-group-item');

  // Criar um array para armazenar os itens do carrinho
  const carrinho = [];

  // Adicionar cada item do carrinho ao array
  itensCarrinho.forEach(item => {
    const nome = item.textContent.split(' - ')[0];
    const valor = parseFloat(item.textContent.split('R$ ')[1]);
    carrinho.push({ nome, valor });
  });

  // Salvar o carrinho no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Recuperar os itens do carrinho do localStorage ao carregar a página
window.addEventListener('load', () => {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  if (carrinhoSalvo) {
    const carrinho = JSON.parse(carrinhoSalvo);
    carrinho.forEach(item => {
      adicionarAoCarrinho(item.nome, item.valor);
    });
  }
});
