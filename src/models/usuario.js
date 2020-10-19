// Define que estamos utilizando o sequelize
const Sequelize = require('sequelize');

// Obtem dados de conexão entre sequelize e banco de dados MySQL
const sequelize = require('../database/database.js');

// Cria tabela no BD e seus campos
const Usuario = sequelize.define("usuario", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    endereco: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    telefone: {
        allowNull: false,
        type: Sequelize.INTEGER(),
        validate: {
            len: [1, 100]
        }
    },
    ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: true
    }
});

module.exports = Usuario;
