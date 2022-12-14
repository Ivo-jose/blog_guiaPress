//Import library
const Sequelize = require("sequelize");
//Import connection
const connection = require("../database/connection");

//Creating module
const Category =  connection.define('categories',{
    title: {
        type: Sequelize.STRING,
        allownull: false
    },
    slug:{
        type: Sequelize.STRING,
        allownull: false
    }
})

//Update BD (only one time)
//Category.sync({force:true})

//Export module
module.exports = Category;