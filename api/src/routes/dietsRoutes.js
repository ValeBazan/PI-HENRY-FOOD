const { Router } = require('express');
const { Diet, Recipe } = require("../db");
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } = process.env;
const { getAllRecipes } = require('../controllers/recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const router = Router();

//[ ] GET /diets
router.get('/', async(req,res, next)=>{
    
    try{
    const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY5}&number=100&offset=100&addRecipeInformation=true`) //traigo info de la api

    const dietsTypes = dietsApi.data.results.map(el => el.diets) //mapeo 
    //console.log(dietsTypes)

    const dietsArray = [...new Set(dietsTypes.flat())]; // desarmo los sub arreglos 

    dietsArray.forEach(el => {
        Diet.findOrCreate({   // dentro del modelo Diet y guardo las dietas en el modelo
            where: {
                name : el
            }
        })
    });

    const allDiets = await Diet.findAll();
    res.send(allDiets);
    
    } catch(error){
        next(error)
    }
});






module.exports = router;