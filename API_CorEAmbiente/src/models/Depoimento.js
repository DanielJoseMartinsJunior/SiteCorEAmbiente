// models/Banner.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection'); // Importe sua configuração do Sequelize

const Depoimento = sequelize.define('Depoimento', {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ordem: {
    type: DataTypes.INTEGER(2),
    allowNull: false,
  },
});

module.exports = Depoimento;