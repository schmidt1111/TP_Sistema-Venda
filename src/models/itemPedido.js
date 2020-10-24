// Define que estamos utilizando o sequelize
const Sequelize = require('sequelize');
// Obtem dados de conexão entre sequelize e banco de dados MySQL
const sequelize = require('../database/database.js');
//criar relacionamento com usuário
const Pedido = require('./pedido');
const Produto = require('./produto');

// Cria tabela no BD e seus campos
const ItemPedido = sequelize.define("itempedido", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    qtd: {
        allowNull: false,
        type: Sequelize.INTEGER(),

    },
    valor: {
        allowNull: false,
        type: Sequelize.DOUBLE(),

    },

    ativo: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: true
    }
});
// To creat relational fields, Foreign Key
Produto.hasMany(ItemPedido);  // 1-N
ItemPedido.belongsTo(Produto);  //N-1

Pedido.hasMany(ItemPedido); //1-N
ItemPedido.belongsTo(Pedido); //N-1

module.exports = ItemPedido;