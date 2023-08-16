import { cardapio } from './cardapio.js';
import { formaDePagamento } from './forma-pagamento.js';

class CaixaDaLanchonete {
  constructor() {
    this.precoDosItens = this.calcularPrecosDosItens();
  }

  calcularPrecosDosItens() {
    const precosDosItens = {};
    for (const item of cardapio) {
      precosDosItens[item.codigo] = parseFloat(item.valor.replace('R$', '').replace(',', '.'));
    }
    return precosDosItens;
  }

  validarItem(item, quantidade) {
    if (!this.precoDosItens[item]) {
      throw new Error('Item inválido!');
    }

    if (isNaN(quantidade) || quantidade <= 0) {
      throw new Error('Quantidade inválida!');
    }
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    if (!formaDePagamento.includes(metodoDePagamento)) {
      return 'Forma de pagamento inválida!';
    }

    let total = 0;
    let sanduicheComprado = false;
    let cafeComprado = false;
    const itensAdicionais = [];

    for (const item of itens) {
      const [produto, quantidade] = item.split(',');

      try {
        this.validarItem(produto, quantidade);
      } catch (error) {
        return error.message;
      }

      if (produto === 'sanduiche') {
        sanduicheComprado = true;
      } else if (produto === 'cafe') {
        cafeComprado = true;
      } else if (produto !== 'suco') {
        itensAdicionais.push(produto);
      }

      total += this.precoDosItens[produto] * parseInt(quantidade, 10);
    }

    if (metodoDePagamento === formaDePagamento[0]) {
      total *= 0.95;
    } else if (metodoDePagamento !== formaDePagamento[1]) {
      total *= 1.03;
    }

    if ((itensAdicionais.includes('chantily') && !cafeComprado) ||
      (itensAdicionais.includes('queijo') && !sanduicheComprado)) {
      return 'Item extra não pode ser pedido sem o principal';
    }

    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
