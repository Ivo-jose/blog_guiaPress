//Import lib
const express = require("express");
const bcrypt = require("bcryptjs");
//Creating router
const router = express.Router();
//Import module
const User = require('./User');


//Route to list users
router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users})
    })
});

//Page route for create user
router.get("/admin/users/create", (req,res) => {
    res.render("admin/users/create")
});

//Route to save user in DB
router.post("/users/create", (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if (user == undefined){
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
        }
        else {
            res.redirect("/admin/users/create");
        }
    });
});

//Login route
router.get("/login", (req,res) => {
    res.render("admin/users/login")
})

router.post("/authenticate", (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined){
            //Validar senha
            let correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            }
            else {
                res.redirect("/login");
            }
        }
        else {
            res.redirect("/login");
        }
    });
});

//Route logout
router.get("/logout", (req,res) => {
    req.session.user = undefined;
    res.redirect("/")
})

//Export router
module.exports = router;