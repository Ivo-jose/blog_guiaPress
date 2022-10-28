//Import library
const Sequelize = require("sequelize");
//Import connection
const connection = require("../database/connection");

//Creating module
const User =  connection.define('users',{
    email: {
        type: Sequelize.STRING,
        allownull: false
    },
    password:{
        type: Sequelize.STRING,
        allownull: false
    }
})


//User.sync({force: false})

//Export module
module.exports = User;