import { cardapio } from './cardapio.js';
import { formaDePagamento } from './forma-pagamento.js';

class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        const pagamentoValido = formaDePagamento.includes(metodoDePagamento);

        if (!pagamentoValido) {
            return 'Forma de pagamento inválida!';
        }

        const precosDosItens = {};
        for (const item of cardapio) {
            precosDosItens[item.codigo] = parseFloat(item.valor.replace('R$', '').replace(',', '.'));
        }

        let total = 0;
        let sanduicheComprado = false;
        let cafeComprado = false
        let itensExtra = [];

        for (const item of itens) {
            const [produto, quantidade] = item.split(',');

            if (!precosDosItens[produto]) {
                return 'Item inválido!';
            }

            if (isNaN(quantidade) || quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (produto === 'sanduiche') {
                sanduicheComprado = true;
            } else if (produto === 'cafe') {
                cafeComprado = true;
            } else if (produto !== 'suco') {
                itensExtra.push(produto);
            }            
            

            total += precosDosItens[produto] * parseInt(quantidade, 10);
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'debito') {
            total *= 1;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        if ((itensExtra.includes('chantily') && !cafeComprado) ||
            (itensExtra.includes('queijo') && !sanduicheComprado)) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
