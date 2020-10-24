const Pedido = require('../models/itempedido');
const status = require('http-status');
const ItemPedido = require('../models/itempedido');


// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const qtd = req.body.qtd;
    const valor = req.body.valor;
    const ativo = req.body.ativo;

    // Popula cada um dos campos do model com os campos recebido na request
    ItemPedido.create({
        qtd: qtd,
        valor: valor,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(itempedido => {
            if (itempedido) {
                res.status(status.OK).send(itempedido);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
//criando o método selecionar todos
exports.SelectAll = (req, res, next) => {
    ItemPedido.findAll()
        .then(itempedido => {
            if (itempedido) {
                res.status(status.OK).send(itempedido);
            }
        })
        .catch(error => next(error));
}
//criar o método selecionar por id
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    ItemPedido.findByPk(id)
        .then(itempedido => {
            if (itempedido) {
                res.status(status.OK).send(itempedido);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
//criar o método atualizar
exports.Update = (req, res, next) => {
    const id = req.params.id;
    //const pedidoId = req.params.pedidoId;
    //const produtoId = req.params.produtoId;
    const qtd = req.body.qtd;
    const valor = req.body.valor;
    const ativo = req.body.ativo;

    ItemPedido.findByPk(id)
        .then(itempedido => {
            if (itempedido) {
                itempedido.update({
                    qtd: qtd,
                    valor: valor,
                    ativo: ativo
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
//criar metodo excluir dado
exports.Delete = (req, res, next) => {
    const id = req.params.id;

    ItemPedido.findByPk(id)
        .then(itempedido => {
            if (itempedido) {
                itempedido.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};