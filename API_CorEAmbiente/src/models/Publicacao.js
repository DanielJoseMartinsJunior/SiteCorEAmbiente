// models/Noticia.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Publicacao = sequelize.define('Publicacao', {
  titulo: {
    type: DataTypes.STRING(100),
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

module.exports = Publicacao;