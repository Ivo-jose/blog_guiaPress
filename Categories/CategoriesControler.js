//Importing library
const express = require("express");
const slugify = require("slugify");
//Create router
const router = express.Router();
//Import Module
const Category = require("./Category");

//Routes
//Route view new category (access admin)
router.get("/admin/categories/new",(req,res) => {
    res.render("admin/categories/newCategory");
});

//Route of view for insertion in DB
router.post("/categories/save", (req,res) => {
    let title = req.body.titleCategory;
    let slug = title.toLowerCase();
    if(title == undefined || title == null || title == ""){
        res.redirect("admin/categories/new");
    }
    else {
        Category.create({
            title: title,
            slug: slugify(slug)
        }).then(() => {
            res.redirect("/")
        })
    }
} );

//Category listing view route
router.get("/admin/categories", (req,res) => {
    Category.findAll().then((categories) => {
        res.render("admin/categories/index", {categories: categories});
    }); 
});



//Route to delete category
router.post("/categories/delete",(req,res) => {
    let categoryId = req.body.categoryId;
    if(categoryId != null || categoryId != undefined || categoryId != ""){
        if(!isNaN(categoryId)){

            Category.destroy({
                where:{
                    id : categoryId
                }
            }).then(() => { res.redirect("/admin/categories")})
        }
        else {
            res.redirect("/admin/categories");
        }
    }
    else {
        res.redirect("/admin/categories");
    }
})

//Exports route for use main file
module.exports = router;