//Import lib
const express = require("express");
const bcrypt = require("bcryptjs");
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

//Route to save user in BD
router.post("/users/create", (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);

    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect("/");
    }).catch(err => {
        res,redirect("/")
    });
});


//Export router
module.exports = router;