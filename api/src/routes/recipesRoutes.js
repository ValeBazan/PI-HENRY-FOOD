const { Router } = require('express');
const { Diet, Recipe } = require("../db");
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } = process.env;
const { getAllRecipes } = require('../controllers/recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const router = Router();

//[ ] GET /recipes?name="...":


router.get('/', async (req, res, next) => {
const {name} = req.query;
   
try{
     if(!name) res.status(200).json(await getAllRecipes())
    else {
        const recipes = await getAllRecipes()
        const recipesFiltered = recipes.filter(r=>r.name.toUpperCase().includes(name.toUpperCase()));
        if (recipesFiltered.length) res.status(200).send(recipesFiltered);
        else res.status(404).send('Recipe not found')
    }
} catch(error){
    next(error);
    }
  });

//[ ] GET /recipes/{idReceta}

router.get('/:id', async(req,res,next)=>{
    const {id} = req.params;

    try{
    const allRecipes = await getAllRecipes() //traigo todas las recetas

    
    let recipesById = allRecipes.filter(el => el.id.toString() === id.toString()) 
    if (recipesById.length){
        res.status(200).send(recipesById) 
    } else {
        res.status(400).send('Recipe not found');
    }
    }catch(error){
    next(error);
    }

})


//[ ] POST/recipes


router.post('/', async(req,res)=>{
    try{
    const {name, image, summary, healthScore, steps, diet } = req.body

    if(!name|| !summary){ // datos obligatorios
        return res.status(404).json({error: 'You must complete the required fields'});
    }

    const newRecipe = await Recipe.create({    // creo la nueva receta
     name, 
     image, 
     summary,
     healthScore,
     steps})

    const dietDb = await Diet.findAll({
        where: {name: diet}    //cuando name = diet que llega por body
    })
    await newRecipe.addDiet(dietDb);  //me traigo de la tabla las dietas 
    res.status(200).send('Recipe created successfully');  
 } catch (error){
    //next(error)
    res.status(404)
 }
});




module.exports = router;