//Import lib
const express = require("express");
//Creating router
const router = express.Router();
//Import module
const User = require('./User');



router.get("/admin/users", (req, res) => {
    res.send("Listagem de usuários")
});

router.get("/admin/users/create", (req,res) => {
    res.render("admin/users/create")
})


//Export router
module.exports = router;