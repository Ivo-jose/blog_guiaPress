//Importing library
const express = require("express");
const slugify = require("slugify");
//Creating router
const router = express.Router();
//Import modules
const Article = require("./Article");
const Category = require("../Categories/Category");


//Routes
//Route view articles
router.get("/articles" ,(req,res) => {
    res.send("ROTAS DE ARTIGOS");
});

//Route view to create new article
router.get("/admin/articles/new", (req,res) => {

    Category.findAll().then((categories) => {
        res.render("admin/articles/newArticle", {categories: categories});
    })  
});

//Exporting router
module.exports = router;