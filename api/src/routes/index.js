const { Router } = require('express');
const { Diet, Recipe } = require("../db");
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4 } = process.env;
const { getAllRecipes } = require('../controllers/recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const router = Router();


//Importar los routers
const recipesRouter = require('./recipesRoutes');
const dietsRouter = require('./dietsRoutes');

// Configurar los routers
router.use('/recipes', recipesRouter);
router.use('/diets', dietsRouter);


module.exports = router;




