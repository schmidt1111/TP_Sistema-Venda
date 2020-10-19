// Define a utilização do model usuario e a dependência http-status
const Usuario = require('../models/usuario');
const status = require('http-status');

// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const ativo = req.body.ativo;

    // Popula cada um dos campos do model com os campos recebido na request
    Usuario.create({
        nome: nome,
        endereco: endereco,
        email: email,
        telefone: telefone,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SelectAll = (req, res, next) => {
    Usuario.findAll()
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            }
        })
        .catch(error => next(error));
}

exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const ativo = req.body.ativo;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.update({
                    nome: nome,
                    endereco: endereço,
                    email: email,
                    telefone: telefone,
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

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.destroy({
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
