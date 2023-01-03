
// Inicialización
const initialState = {
    recipes: [],
    allRecipes: [], //hago una copia del estado que tenga siempre todas las recetas 
    diets: [], 
    detail: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES': 
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload //traigo todas las recetas y las guardo
            }

        case  'GET_NAME_RECIPES':
            return{
                ...state,
                recipes: action.payload
            }
        
        case 'FILTER_BY_DIET':
        const allRecipes = state.allRecipes
        const dietsFiltered = allRecipes.filter(r => r.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase())) //filtro del arreglo que tiene todo
           return{
                ...state,
                recipes: dietsFiltered // se modifica solo el estado recipes
        }

        case 'ADD_RECIPE':
            return{
                ...state
            }

        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }   

        case 'ALPHABETICAL_SORT':
        let sortedRecipes = [...state.allRecipes]  
        sortedRecipes = action.payload === "az" ?  //action payload es de A a Z?
            state.allRecipes.sort(function(a,b){  //accedo al estado allRecipes y le hago sort
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }) :
            state.allRecipes.sort(function(a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                return 0;
              }); 
              
            return {
                ...state,
                recipes: sortedRecipes
            };

        case 'SCORE_SORT':
        let sortedRecipesScore = [...state.allRecipes]  
        sortedRecipesScore = action.payload === "asc" ?
            state.allRecipes.sort(function(a,b){
                if(a.healthScore > b.healthScore) return 1;
                if(a.healthScore < b.healthScore) return -1;
                return 0;
            }) :
            state.allRecipes.sort(function(a,b) {
                if (a.healthScore < b.healthScore) return 1;
                if (a.healthScore > b.healthScore) return -1;
                return 0;
              }); 
              
            return {
                ...state,
                recipes: sortedRecipesScore
            };

        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }; 
            
        default: 
                return state;    
    }   
}

export default rootReducer;