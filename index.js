//Importing libraries
const express = require("express");
const bodyParser = require("body-parser");
//Creating instance of express
const app = express();

//Importing connection
const connection = require('./database/connection');

//Importing routes
//CategoriesController
const categoriesController = require('./Categories/CategoriesControler');
//ArticlesController
const articlesController = require('./Articles/ArticlesController');

//Import modules
const Category = require('./Categories/Category');
const Article = require('./Articles/Article');

//Setting view engine ejs
app.set('view engine', 'ejs');

//Setting express to work static file
app.use(express.static('public'))

//Use body-parser
//Form data
app.use(bodyParser.urlencoded({extended:false}));
//Json data
app.use(bodyParser.json());


//Connecting DB
connection
    .authenticate()
    .then(() => {
        console.log('DB successfully conected!')
    }).catch((err) => {
        console.log(err);
    })


//Telling express to use categoriesController
app.use("/", categoriesController);    
//Telling express to use articlesController
app.use("/", articlesController );


//Main route
app.get("/", (req,res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles => {
        res.render("index", {articles: articles});
    })
})

//View page route only one article
app.get("/:slug",(req,res) => {
    let slug = req.params.slug;
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article => {
        if(article != undefined || article != null || article != ""){
            res.render("articles", {article: article})
        }
        else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
});

//Starting serve
app.listen(8080, () => {
    console.log("Server running!")
})