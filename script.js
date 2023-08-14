import { CaixaDaLanchonete } from './src/caixa-da-lanchonete.js';
import { cardapio } from './src/cardapio.js';

function adicionarNovoItem(quantidade, descricaoDoItem, codigoDoItem) {
  if (quantidade > 0) {
    const li = document.createElement('li');
    li.textContent = `${descricaoDoItem}, ${quantidade}`;
    li.setAttribute('data-codigo', codigoDoItem);
    li.setAttribute('data-quantidade', quantidade);
    listaPedido.appendChild(li);
  }

  mensagemResultado.innerText = '';
}

function atualizarItemExistenteOuRemover(itemIndex, quantidade, descricaoDoItem) {
  const itemLi = listaPedido.querySelectorAll('li')[itemIndex];

  if (quantidade > 0) {
    itemLi.textContent = `${descricaoDoItem}, ${quantidade}`;
    itemLi.setAttribute('data-quantidade', quantidade);
  } else {
    listaPedido.removeChild(itemLi);
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

  divItem.innerHTML = `
    <img src="${item.img}" alt="${item.descricao}">
    <h2>${item.descricao}</h2>
    <p>Valor: ${item.valor}</p>
    <div class="container-quantidade">
      <span>Un:</span>   
      <button class="botao botaoMenos" data-operation="-">-</button>
      <span id="quantidade" data-quantidade="0">0</span>
      <button class="botao botaoMais" data-operation="+">+</button>
    </div>
  `;

  cardapioSection.appendChild(divItem);
});

cardapioSection.addEventListener('click', event => {
  const operacao = event.target.getAttribute('data-operation');

  const simboloMenos = '-';
  const simboloMais = '+';

  const diferenteDeOperacao = operacao !== simboloMenos && operacao !== simboloMais;

  if (diferenteDeOperacao) return;

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

    const listaDeItens = Array.from(listaPedido.querySelectorAll('li'));

    const itemIndex = listaDeItens.findIndex(li => li.getAttribute('data-codigo') === codigoDoItem);

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

  const itensDoPedido = [];

  listaPedido.querySelectorAll('li').forEach(li => {
    const codigoDoItem = li.getAttribute('data-codigo');
    const quantidadeDoItem = li.getAttribute('data-quantidade');

    const itemPedido = `${codigoDoItem},${quantidadeDoItem}`;
    itensDoPedido.push(itemPedido);
  });

  const caixa = new CaixaDaLanchonete();
  const valorDaCompra = caixa.calcularValorDaCompra(formaPagamentoSelecionada, itensDoPedido);

  const valorCompraErro = mensagemErros.some(erro => erro === valorDaCompra);


  if (valorCompraErro) {
    mensagemResultado.setAttribute('class', 'mensagemResultadoErro');
    mensagemResultado.innerText = valorDaCompra;
    return
  }

  listaPedido.innerText = '';

  cardapioSection.querySelectorAll('#quantidade').forEach(quantidadeElemento => {
    quantidadeElemento.setAttribute('data-quantidade', 0);
    quantidadeElemento.innerText = 0;
  });

  dinheiroInput.checked = false;
  debitoInput.checked = false;
  creditoInput.checked = false;

  mensagemResultado.setAttribute('class', 'mensagemResultadoSucesso')
  mensagemResultado.innerText = valorDaCompra;

});
