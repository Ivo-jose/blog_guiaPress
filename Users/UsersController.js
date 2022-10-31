//Import lib
const express = require("express");
//Creating router
const router = express.Router();
//Import module
const User = require('./User');



router.get("/admin/users", (req, res) => {
    res.send("Listagem de usuários")
});

//Page route for create user
router.get("/admin/users/create", (req,res) => {
    res.render("admin/users/create")
});

//
router.post("/users/create", (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    res.json({email,password});
})


//Export router
module.exports = router;