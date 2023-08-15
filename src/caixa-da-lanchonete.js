class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const itemLista = [
            {codigo: "cafe", descricao: "Café", valor: 3.00},
            {codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.50},
            {codigo: "suco", descricao: "Suco Natural", valor: 6.20},
            {codigo: "sanduiche", descricao: "Sanduíche", valor: 6.50},
            {codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2.00},
            {codigo: "salgado", descricao: "Salgado", valor: 7.25},
            {codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.50},
            {codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.50}
        ];
        
        let cafePedido = false;
        let sanduichePedido = false;
        let total = 0;

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        } else {
            for (const itensInformacao of itens) {
                const [codigo, quantidade] = itensInformacao.split(",");
                const itemInformacao = itemLista.find(info => info.codigo === codigo.trim());
                
                if (!itemInformacao) {
                    return "Item inválido!";
                }

                const quantidadeInt = parseInt(quantidade.trim());

                if (isNaN(quantidadeInt) || quantidadeInt <= 0) {
                    return "Quantidade inválida!";
                }

                const subtotal = itemInformacao.valor * quantidadeInt;
                    
                if (itemInformacao.codigo === "cafe") {
                    cafePedido = true;
                } else if (itemInformacao.codigo === "sanduiche") {
                    sanduichePedido = true;
                } else if (itemInformacao.codigo === "chantily" && !cafePedido) {
                    return "Item extra não pode ser pedido sem o principal";
                } else if (itemInformacao.codigo === "queijo" && !sanduichePedido) {
                    return "Item extra não pode ser pedido sem o principal";
                }

                total += subtotal;
            }

            if (total > 0) {
                if (metodoDePagamento === "dinheiro") {
                    total -= total * 0.05;
                } else if (metodoDePagamento === "credito") {
                    total += total * 0.03;
                } else if (metodoDePagamento !== "debito") {
                    return "Forma de pagamento inválida!";
                }
                return `R$ ${total.toFixed(2).replace(".", ",")}`;
            }
        }
    }
}


new CaixaDaLanchonete().calcularValorDaCompra("dinheiro", ["cafe,1"])

export { CaixaDaLanchonete };
