const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection'); // Importe sua configuração do Sequelize

const Publicacao = sequelize.define('Publicacao',{
    titulo:{
        type: DataTypes.STRING(250),
        allownull : false,
    },
    conteudo:{
        type: DataTypes.STRING(400),
        allownull: false,
    },
    imagem:{
        type: DataTypes.STRING(255),
        allownull: false
    }
});