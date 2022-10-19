//Importing library
const express = require("express");
//Create router
const router = express.Router();

//Routes
//Route view categories
router.get("/categories", (req,res) => {
    res.send("ROTAS DE CATEGORIAS")
});


//Route  view to create category (access admin)
router.get("/admin/categories/new", (req,res) => {
    res.send("ROTA PARA CRIAR NOVA CATEGORIA")
})


//Exports route for use main file
module.exports = router;