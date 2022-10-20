//Import library
const Sequelize = require("sequelize");
//Import connection
const connection = require("../database/connection");
//Import module for relationship
const Category = require("../Categories/Category");

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

//Creating a two-way relationship
//One-to-One
Article.belongsTo(Category);
//One-to-Many
Category.hasMany(Article);

//Update BD (only one time)
//Article.sync({force:true})


//Exporting module
module.exports = Article;