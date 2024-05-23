const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection'); // Importe sua configuração do Sequelize

const NossosTrabalhos = sequelize.define('NossosTrabalhos',{
    titulo:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    descricao:{
        type: DataTypes.STRING(400),
        allowNull: false,
    },
    imagem:{
        type: DataTypes.STRING(255),
        allowNull: false,
    }

})