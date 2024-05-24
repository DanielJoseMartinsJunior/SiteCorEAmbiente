const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('cor_e_ambiente_decoracao_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});
module.exports = sequelize