const { Router } = require('express');
const { Diet, Recipe } = require("../db");
const { API_KEY1, API_KEY2 } = process.env;
const { getAllRecipes } = require('../controllers/recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//[ ] GET /recipes?name="...":
router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    if(!name) res.status(200).json(await getAllRecipes())
    else {
        const recipes = await getAllRecipes()
        const recipesFiltered = recipes.filter(r=>r.name.toUpperCase().includes(name.toUpperCase()));
        if (recipesFiltered.length) res.status(200).send(recipesFiltered);
        else res.status(404).send('Recipe not found')
    }
  });

//[ ] GET /recipes/{idReceta}:
router.get('/recipes/:id', async(req,res)=>{
    const {id} = req.params;
    const allRecipes = await getAllRecipes() //traigo todas las recetas

    
    let recipesById = allRecipes.filter(el => el.id.toString() === id.toString())
    if (recipesById.length){
        res.status(200).send(recipesById) 
    } else {
        res.status(400).send('Recipe not found');
    }

})

//[ ] POST/recipes
router.post('/recipes', async(req,res)=>{
    try {
        const {id, name, image, summary, healthScore, steps, createdIdDB, diet } = req.body

        const newRecipe = await Recipe.create({    // creo la nueva receta
        id, name, image, summary, healthScore, steps, createdIdDB, diet})

        let dietDb = await Diet.findAll({
            where: {name: diet}    //cuando name = diets que llega por body
        })
        await newRecipe.addDiet(dietDb)
        res.status(200).send('Recipe created successfully')  
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    };
});

//[ ] GET /diets



module.exports = router;
