const Sequelize = require('sequelize')
module.exports = new Sequelize(db,username,pass,{
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,

    pool: {
        max:5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})
