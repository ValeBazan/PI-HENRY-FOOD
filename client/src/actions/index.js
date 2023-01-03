import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        try{
        const json = await axios.get('http://localhost:3001/recipes'); //conexion del back y el front
    
        return dispatch({ 
            type: 'GET_RECIPES',
            payload: json.data
        })
        
        }catch(error){
            console.log(error)
        }
 }
}

 export function getNameRecipes(payload){
    return async function(dispatch){
      try{
        const json = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
        return dispatch({
            type: 'GET_NAME_RECIPES',
            payload: json.data //es lo que devuelve la ruta del localhost 
        })
    } catch(error){
        console.log(error)
    }
 }
 }

 export function getDiets(){
    return async function(dispatch){
        try{
            const result = await axios.get('http://localhost:3001/diets')
            return dispatch({
                type:'GET_DIETS',
                payload: result.data
            })
        } catch(error){
            console.log (error)
        }
    }
 }

 export function addRecipe(payload){
    return async function(dispatch){
        try{
            const response = await axios.post('http://localhost:3001/recipes', payload)
            console.log(response)
            return response
        } catch(error){
            console.log(error)
        }
    }
 }


export function filterByDiet(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function alphabeticalSort(payload) {
    return {
        type: 'ALPHABETICAL_SORT',
        payload
    }
};

export function scoreSort(payload) {
    return {
        type: 'SCORE_SORT',
        payload
    }
};

export function getDetail(id){
    return async function (dispatch){
        try{
            let res = await axios.get('http://localhost:3001/recipes/' + id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: res.data
            })
        } catch(error){
            console.log(error)
        }
    }
}
