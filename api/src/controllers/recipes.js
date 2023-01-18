const axios = require("axios");
const db = require("../db");
const { Diet, Recipe } = require("../db");
const { API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7 } = process.env;


const getApiInfo = async()=>{
    
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY3}&number=100&offset=100&addRecipeInformation=true`);
    //console.log(apiUrl);
    
    const apiInfo = await apiUrl.data.results.map(el => {
        return{
            id: el.id,
            name: el.title,
            vegetarian: el.vegetarian,
            vegan: el.vegan,
            glutenFree: el.glutenFree,
            dairyFree: el.dairyFree, 
            image: el.image, 
            healthScore: el.healthScore,
            summary: el.summary, 
            types: el.dishTypes?.map(element => element),
            diets: el.diets?.map(element => element), 
            steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps?el.analyzedInstructions[0].steps.map(item=>item.step):'')
        }
        
    })
    // console.log(apiInfo);
    return apiInfo;   
};


const getDbInfo = async ()=>{
    try{
        const dataDB =  await Recipe.findAll({ 
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
        let response = await dataDB?.map(recipe => {
                 return {
                     id: recipe.id,
                     name: recipe.name,
                     summary: recipe.summary,
                     score: recipe.score,
                     healthScore: recipe.healthScore,
                     image: recipe.image,
                     steps: recipe.steps,
                     diets: recipe.diets?.map(diet => diet.name),
                 }
             });
        return response;
    }catch (error) {
      console.error(error);
    }
};

const getAllRecipes = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo); // [] info de db y la api
    return allInfo;
}



module.exports = {
    getApiInfo,
    getDbInfo,
    getAllRecipes
}