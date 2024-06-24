const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../conn/connection'); // Importe sua configuração do Sequelize
const Pergunta = sequelize.define('Pergunta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resposta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ordem: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'perguntas',
  timestamps: true, // Se você quiser timestamps automáticos (createdAt, updatedAt)
});

module.exports = Pergunta;
