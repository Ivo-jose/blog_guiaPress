//Import library
const Sequelize = require("sequelize");
//Import connection
const connection = require("../database/connection");

//Creating module
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allownull: false
    },
    slug: {
        type: Sequelize.STRING,
        allownull: false
    },
    body:{
        type: Sequelize.TEXT,
        allownull: false
    }
});

//Exporting module
module.exports = Article;