//Importing library
const express = require("express");
//Creating router
const router = express.Router();

//Routes
//Route view articles
router.get("/articles" ,(req,res) => {
    res.send("ROTAS DE ARTIGOS");
});

//Route view to create new article
router.get("/admin/articles/new", (req,res) => {
    res.send("ROTA PARA CRIAÇÃO DE UM NOVO ARTIGO");
});

//Exporting router
module.exports = router;