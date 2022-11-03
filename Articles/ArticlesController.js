//Importing library
const express = require("express");
const slugify = require("slugify");
//Creating router
const router = express.Router();
//Import modules
const Article = require("./Article");
const Category = require("../Categories/Category");
//Import middleware
const adminAuth = require("../middlewares/adminAuth");


//Routes

//View route for listing articles
router.get("/admin/articles", adminAuth ,(req,res) => {
    Article.findAll({
        include:[{
            model: Category
        }]
    }).then(articles => {
        res.render("admin/articles/index" , {articles: articles});
    })
    
});

//Route view to create new article
router.get("/admin/articles/new", adminAuth, (req,res) => {

    Category.findAll().then((categories) => {
        res.render("admin/articles/newArticle", {categories: categories});
    })  
});

//View route for inserting articles in DB
router.post("/articles/save", adminAuth,(req,res) => {
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
router.post("/articles/delete", adminAuth, (req,res) => {
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

//Route to edit articles
router.get("/admin/articles/edit/:id", adminAuth ,(req,res) => {
    let id = parseInt(req.params.id);
    if(isNaN(id)) {
        res.redirect("/admin/articles/index");
    }

    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then( categories => {
                res.render("admin/articles/editArticle", {article: article, categories: categories});
            })
        }
        else {
            res.redirect("/admin/articles/index");
        }
            
    }).catch(err => {
        res.redirect("/admin/articles/index");  
    });
    
});


//Route to update article
router.post("/articles/update", (req,res) => {
    let id = parseInt(req.body.articleId);
    let title = req.body.articleTitle;
    let slug = title.toLowerCase();
    let body = req.body.bodyArticle;
    let categoryId = req.body.category;

    Article.update({title: title, slug: slugify(slug), body:body, categoryId: categoryId},{
            where:{
                id:id
            }
    }).then(()=> {
        res.redirect("/admin/articles");
    });
    
});

//Route for articles pagination
router.get("/articles/page/:num", (req,res) => {
    let page = req.params.num;
    let offset = 0;
    if(isNaN(page) || page == 1){
        offset = 0;
    }else {
        offset = (parseInt(page)-1) * 4;
    }


    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order:[
            ['id','DESC']
        ]
    }).then(articles => {

        let next;
        if(offset + 4 > articles.count){
            next = false;
        }
        else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }
        Category.findAll().then(categories => {
            res.render("admin/articles/page", {result: result , categories: categories})
        })
    })
})

//Exporting router
module.exports = router;