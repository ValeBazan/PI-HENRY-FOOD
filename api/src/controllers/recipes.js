const axios = require("axios");
const db = require("../db");
const { Diet, Recipe } = require("../db");
const { API_KEY1, API_KEY2 } = process.env;


const getApiInfo = async()=>{
    
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=100&offset=100&addRecipeInformation=true`);
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
            steps: el.analyzedInstructions[0]?.steps.map(el => {
                return {
                    number: el.number,
                    step: el.step
                }
            })
        }
        
    })
    // console.log(apiInfo);
    return apiInfo;   
};




const getDbInfo = async ()=>{
    return await Recipe.findAll({
        include: {
            model : Diet,
            attributes: ['name'],  // traigo el modelo Diet mediante el atributo name
            through: {
                attributes: []
            }
        }
    })
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