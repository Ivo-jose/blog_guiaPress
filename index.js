//Importing libraries
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
//Creating instance of express
const app = express();

//Importing connection
const connection = require('./database/connection');

//Importing routes
//CategoriesController
const categoriesController = require('./Categories/CategoriesControler');
//ArticlesController
const articlesController = require('./Articles/ArticlesController');
//UsersController
const usersController = require('./Users/UsersController');


//Import modules
const Category = require('./Categories/Category');
const Article = require('./Articles/Article');
const User = require('./Users/User')


//Setting view engine ejs
app.set('view engine', 'ejs');

//Setting sessoin
app.use(session({
    resave: false, 
    saveUninitialized: true,
    secret: "qu4lqu3rC0154Al34t0r10",
    cookie: {
        maxAge: 604800000
    }
}))

//Using express to work static file
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
//Telling express to use usersController
app.use("/", usersController);





//Main route
app.get("/", (req,res) => {
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", {articles: articles , categories: categories});
        })
    });
});

//View page route only one article
app.get("/:slug",(req,res) => {
    let slug = req.params.slug;
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article => {
        if(article != undefined || article != null){
            Category.findAll().then(categories => {
                res.render("articles", {article: article, categories: categories})
            })
        }
        else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
});

//View route of filtred article by category
app.get("/category/:slug", (req,res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then(category => {
        if(category != null || category != undefined){
            
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories:categories})
            })
        }
        else {
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    });
});

//Starting serve
app.listen(8080, () => {
    console.log("Server running!")
})