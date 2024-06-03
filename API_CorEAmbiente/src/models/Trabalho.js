// models/Noticia.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Trabalho = sequelize.define('Trabalho', {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  imagem_principal: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  imagens_internas: {
    type: DataTypes.TEXT, // Armazenar como JSON
    allowNull: true,
  },
});

module.exports = Trabalho;