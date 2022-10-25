//Importing library
const express = require("express");
const slugify = require("slugify");
//Creating router
const router = express.Router();
//Import modules
const Article = require("./Article");
const Category = require("../Categories/Category");


//Routes

//View route for listing articles
router.get("/admin/articles" ,(req,res) => {
    res.render("admin/articles/index");
});

//Route view to create new article
router.get("/admin/articles/new", (req,res) => {

    Category.findAll().then((categories) => {
        res.render("admin/articles/newArticle", {categories: categories});
    })  
});

//View route for inserting articles in DB
router.post("/articles/save",(req,res) => {
    let articleTitle = req.body.articleTitle;
    let slug = articleTitle.toLowerCase();
    let bodyArticle = req.body.bodyArticle;
    let categoryId = req.body.category;

    Article.create({
        title: articleTitle,
        slug: slugify(slug),
        body: bodyArticle,
        categoryId: categoryId
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

//Exporting router
module.exports = router;