// Define que estamos utilizando o sequelize
const Sequelize = require('sequelize');
// Obtem dados de conexão entre sequelize e banco de dados MySQL
const sequelize = require('../database/database.js');
//criar relacionamento com usuário
const Usuario = require('./usuario');

// Cria tabela no BD e seus campos
const Pedido = sequelize.define("pedido", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    observacoes: {
        allowNull: false,
        type: Sequelize.STRING(100),

    },
    valorTotal: {
        allowNull: true,
        type: Sequelize.DOUBLE(),
    },

    ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: true
    }
});
// To creat relational fields, Foreign Key
Usuario.hasMany(Pedido);  // 1-N
Pedido.belongsTo(Usuario);  //N-1

module.exports = Pedido;