const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection'); // Importe sua configuração do Sequelize

const Pergunta = sequelize.define('Pergunta',{
    titulo:{
        type: DataTypes.STRING(100),
    },
    resposta:{
        type : DataTypes.STRING(300),
    },
})

module.exports = Pergunta;