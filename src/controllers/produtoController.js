// Define a utilização do model produto e a dependência http-status
const Produto = require('../models/produto');
const status = require('http-status');


// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const precocusto = req.body.precocusto;
    const precovenda = req.body.precovenda;
    const quantidade = req.body.quantidade;
    const ativo = req.body.ativo;

    // Popula cada um dos campos do model com os campos recebido na request
    Produto.create({
        nome: nome,
        precocusto: precocusto,
        precovenda: precovenda,
        quantidade: quantidade,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
//criando o método selecionar todos
exports.SelectAll = (req, res, next) => {
    Produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}
//criar o método selecionar por id
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
//criar o método atualizar
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const precocusto = req.body.precocusto;
    const precovenda = req.body.precovenda;
    const quantidade = req.body.quantidade;
    const ativo = req.body.ativo;

    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.update({
                    nome: nome,
                    precocusto: precocusto,
                    precovenda: precovenda,
                    quantidade: quantidade,
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

    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.destroy({
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
