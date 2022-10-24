//Importing library
const express = require("express");
const slugify = require("slugify");
//Creating router
const router = express.Router();
//Import module
const Article = require("./Article");

//Routes
//Route view articles
router.get("/articles" ,(req,res) => {
    res.send("ROTAS DE ARTIGOS");
});

//Route view to create new article
router.get("/admin/articles/new", (req,res) => {
    res.render("admin/articles/newArticle");
});

//Exporting router
module.exports = router;