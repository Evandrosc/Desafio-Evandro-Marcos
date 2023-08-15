import { CaixaDaLanchonete } from './src/caixa-da-lanchonete.js';
import { cardapio } from './src/cardapio.js';

function adicionarNovoItem(quantidade, descricaoDoItem, codigoDoItem) {
  if (quantidade > 0) {
    const newRow = document.createElement('tr');
    const descricaoCell = document.createElement('td');
    const quantidadeCell = document.createElement('td');

    descricaoCell.textContent = descricaoDoItem;
    quantidadeCell.textContent = quantidade;

    newRow.appendChild(descricaoCell);
    newRow.appendChild(quantidadeCell);

    newRow.setAttribute('data-codigo', codigoDoItem);
    newRow.setAttribute('data-quantidade', quantidade);

    listaPedido.querySelector('tbody').appendChild(newRow);
  }

  mensagemResultado.innerText = '';
}

function atualizarItemExistenteOuRemover(itemIndex, quantidade, descricaoDoItem) {
  const rows = listaPedido.querySelectorAll('tr');
  const itemRow = rows[itemIndex];

  if (quantidade > 0) {
    const quantidadeCell = itemRow.querySelector('td:nth-child(2)');
    quantidadeCell.textContent = quantidade;

    itemRow.setAttribute('data-quantidade', quantidade);
  } else {
    listaPedido.querySelector('tbody').removeChild(itemRow);
  }

  mensagemResultado.innerText = '';
}

function armazenarFormaPagamento(callback) {

  dinheiroInput.addEventListener('change', () => {
    callback(dinheiroInput.value);
  });

  debitoInput.addEventListener('change', () => {
    callback(debitoInput.value);
  });

  creditoInput.addEventListener('change', () => {
    callback(creditoInput.value);
  });
}

const cardapioSection = document.querySelector('#cardapio');
const form = document.querySelector('#formulario-pedido');
const listaPedido = document.querySelector('#lista-pedido');
const dinheiroInput = document.getElementById('dinheiro');
const debitoInput = document.getElementById('debito');
const creditoInput = document.getElementById('credito');
let formaPagamentoSelecionada;
const mensagemResultado = document.querySelector('#mensagem-resultado');


const mensagemErros = [
  'Não há itens no carrinho de compra!',
  'Forma de pagamento inválida!',
  'Item inválido!',
  'Quantidade inválida!',
  'Item extra não pode ser pedido sem o principal'
];

cardapio.forEach(item => {
  const divItem = document.createElement('div');
  divItem.classList.add('item-cardapio');

  const itemExtra = item.extra ? 'img-extra' : '';

  divItem.innerHTML = `
    <div class="container-img">
      <img class="${itemExtra}" src="${item.img}" alt="${item.descricao}">
      <h2>${item.descricao}</h2>
    </div>
    <div class="container-quantidade">
      <p>${item.valor}</p>
      <div class="container-botoes">
        <button class="botao botaoMenos" data-operation="-">-</button>
        <span id="quantidade" data-quantidade="0">0</span>
        <button class="botao botaoMais" data-operation="+">+</button>
      </div>
    </div>
  `;

  cardapioSection.appendChild(divItem);
});

cardapioSection.addEventListener('click', event => {
  const operacao = event.target.getAttribute('data-operation');
  const simboloMenos = '-';
  const simboloMais = '+';

  if (operacao !== simboloMenos && operacao !== simboloMais) return;

  const quantidadeElemento = event.target.parentElement.querySelector('[data-quantidade]');
  const divItem = event.target.closest('.item-cardapio');

  let quantidade = parseInt(quantidadeElemento.getAttribute('data-quantidade'));
  if (operacao === simboloMais) {
    quantidade++;
  } else if (operacao === simboloMenos && quantidade > 0) {
    quantidade--;
  }

  quantidadeElemento.setAttribute('data-quantidade', quantidade);
  quantidadeElemento.innerText = quantidade;

  const descricaoDoItem = divItem.querySelector('h2').innerText;

  const itemCardapio = cardapio.find(item => item.descricao === descricaoDoItem);

  if (itemCardapio) {
    const codigoDoItem = itemCardapio.codigo;

    const rows = listaPedido.querySelectorAll('tr');
    const itemIndex = Array.from(rows).findIndex(row => row.getAttribute('data-codigo') === codigoDoItem);

    if (itemIndex >= 0) {
      atualizarItemExistenteOuRemover(itemIndex, quantidade, descricaoDoItem);
    } else {
      adicionarNovoItem(quantidade, descricaoDoItem, codigoDoItem);
    }
  }
});


armazenarFormaPagamento((formaDePagamento) => {
  formaPagamentoSelecionada = formaDePagamento;
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const tableBody = listaPedido.querySelector('tbody');

  const itensDoPedido = [];
  
  const rows = listaPedido.querySelectorAll('tr');

  rows.forEach(row => {
    const codigoDoItem = row.getAttribute('data-codigo');
    const quantidadeDoItem = row.getAttribute('data-quantidade');
    if (codigoDoItem && quantidadeDoItem) {
      const itemPedido = `${codigoDoItem},${quantidadeDoItem}`;
      itensDoPedido.push(itemPedido);
    }
  });

  const caixa = new CaixaDaLanchonete();
  const valorDaCompra = caixa.calcularValorDaCompra(formaPagamentoSelecionada, itensDoPedido);

  const valorCompraErro = mensagemErros.some(erro => erro === valorDaCompra);

  if (valorCompraErro) {
    mensagemResultado.setAttribute('class', 'mensagemResultadoErro');
    mensagemResultado.innerText = valorDaCompra;
    return;
  }

  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  if (formaPagamentoSelecionada === dinheiroInput.value) {
    dinheiroInput.checked = false;
  } else if (formaPagamentoSelecionada === debitoInput.value) {
    debitoInput.checked = false;
  } else {
    creditoInput.checked = false;
  }

  formaPagamentoSelecionada = '';

  cardapioSection.querySelectorAll('#quantidade').forEach(quantidadeElemento => {
    quantidadeElemento.setAttribute('data-quantidade', 0);
    quantidadeElemento.innerText = 0;
  });

  mensagemResultado.setAttribute('class', 'mensagemResultadoSucesso');
  mensagemResultado.innerText = valorDaCompra;
});
