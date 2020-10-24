const Pedido = require('../models/pedido');
const status = require('http-status');


// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const observacoes = req.body.observacoes;
    const valorTotal = req.body.valorTotal;
    const ativo = req.body.ativo;

    // Popula cada um dos campos do model com os campos recebido na request
    Pedido.create({
        observacoes: observacoes,
        valorTotal: valorTotal,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(pedido => {
            if (pedido) {
                res.status(status.OK).send(pedido);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
//criando o método selecionar todos
exports.SelectAll = (req, res, next) => {
    Pedido.findAll()
        .then(pedido => {
            if (pedido) {
                res.status(status.OK).send(pedido);
            }
        })
        .catch(error => next(error));
}
//criar o método selecionar por id
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    Pedido.findByPk(id)
        .then(pedido => {
            if (pedido) {
                res.status(status.OK).send(pedido);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
//criar o método atualizar
exports.Update = (req, res, next) => {
    const id = req.params.id;
    // const idCliente = req.params.idCliente;    
    const observacoes = req.body.observacoes;
    const valorTotal = req.body.valorTotal;
    const ativo = req.body.ativo;

    Pedido.findByPk(id)
        .then(pedido => {
            if (pedido) {
                pedido.update({
                    observacoes: observacoes,
                    valorTotal: valorTotal,
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

    Pedido.findByPk(id)
        .then(pedido => {
            if (pedido) {
                pedido.destroy({
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