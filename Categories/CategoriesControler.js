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
        res.redirect("/admin/categories/new");
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


//Exports route for use main file
module.exports = router;