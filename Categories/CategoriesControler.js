//Importing library
const express = require("express");
//Create router
const router = express.Router();

//Routes
//Route view new category
router.get("/admin/categories/new",(req,res) => {
    res.render("admin/categories/newCategory");
})


//Exports route for use main file
module.exports = router;