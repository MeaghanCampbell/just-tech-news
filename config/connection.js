// import Sequelize constructor from the library
const Sequelize = require('sequelize')

// dont need this to be given a variable name as we won't use it again
require('dotenv').config()

// create connection to database and use dotenv file to hold credentials
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

// export sequelize connection
module.exports = sequelize