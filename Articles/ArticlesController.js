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
    Article.findAll({
        include:[{
            model: Category
        }]
    }).then(articles => {
        res.render("admin/articles/index" , {articles: articles});
    })
    
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
    }).
    catch(err => {
        res.redirect("/admin/articles")
    })
});

//Route to delete article
router.post("/articles/delete", (req,res) => {
    let articleId = req.body.articleId;
    if(articleId != null || articleId != undefined || articleId != ""){
        if(!isNaN(articleId)){
            Article.destroy({
                where:{
                    id: articleId
                }
            }).then(() => {res.redirect("/admin/articles")});
        }
        else {
            res.redirect("/admin/articles");
        }
    }
    else {
        res.redirect("/admin/articles");
    }
});

//Route for articles pagination
router.get("/articles/page/:num", (req,res) => {
    let page = req.params.num;
    let offset = 0;
    if(isNaN(page) || page == 1){
        offset = 0;
    }else {
        offset = parseInt(page) * 6;
    }


    Article.findAndCountAll({
        limit: 6,
        offset: offset
    }).then(articles => {

        let next;
        if(offset + 6 > articles.count){
            next = false;
        }
        else {
            next = true;
        }

        let result = {
            next: next,
            articles: articles
        }

        res.json(result)
    })
})

//Exporting router
module.exports = router;