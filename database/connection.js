//Importing sequelize
const Sequelize = require("sequelize");

//Creating connection object
const connection = new Sequelize('guiapress', 'ivo', 'karina3_gioVanna*36',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

//Exporting connection
module.exports = connection;

