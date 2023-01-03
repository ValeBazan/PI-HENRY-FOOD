import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterByDiet, alphabeticalSort, scoreSort, getDiets} from "../actions"
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import s from "./Home.module.css"

let prevId = 1;

export default function Home(){
    
    const dispatch = useDispatch() //dispacho las acciones
    const allRecipes = useSelector((state)=> state.recipes)
    //Es equivalente el mapStateToProps
    //console.log(allRecipes)
    const [order, setOrder] = useState('')
    
    
    const [currentPage,setCurrentPage] = useState(1); //pag actual
    const [recipesPerPage, setRecipesPerPage] = useState(9); //guardo cuantos personajes quiero por pag

    const indexLastRecipe = currentPage * recipesPerPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe); // recetas en la pag actual

    const paged = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getRecipes()) //equivalente a mapDispatchToProps, traigo del estado las recetas cuando el componente se monta
        dispatch(getDiets()) //ver si hace falta!!!!!!!!!
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterDiets(e){
        dispatch(filterByDiet(e.target.value)) // con e.target.value accedo a cada una de las dietas. Toma como payload el valor de acuerdo a cual clickea el usuario 
    }

    function handleAlphabeticalSort(e){
        e.preventDefault();
        dispatch(alphabeticalSort(e.target.value))
        setCurrentPage(1); //seteo la pagina en la primera
        setOrder(`Order ${e.target.value}`); //modifica el estado local y se renderiza
    }

    function handleScoreSort(e){
        e.preventDefault();
        dispatch(scoreSort(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }

    return(
        <div className={s.home}>
          <div className={s.bar}>
            <Link to= {'/recipe'}>Add new recipe!</Link>  
            <h1 className={s.title}>Let's do it!</h1>
            <button className={s.buttonRefresh} onClick={e=> {handleClick(e)}}>Refresh recipes</button>
            <div className={s.filterSort}>
                <select onChange={e=> handleAlphabeticalSort(e)}>
                    <option>Alphabetical</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
                <select onChange={e=> handleScoreSort(e)}>
                    <option>Health Score</option>
                    <option value="asc">0-100</option>
                    <option value="desc">100-0</option>
                </select>
                <select onChange={e=> handleFilterDiets(e)}>
                    <option>Diets</option>
                    <option value="dairy free">Dairy-free</option>
                    <option value="vegan">Vegan</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="primal">Primal</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="ketogenic">Ketogenic</option>  
                </select>
                <SearchBar/>
                </div>
                </div>  
          <div className={s.cards}>
           {currentRecipes?.map((c)=>{
               return(
                   <div key={prevId++}>
                <Link to={'/recipes/' + c.id}>
                <Card key= {c.id} name={c.name} image={c.image} diets={c.diets}></Card>
                </Link>
                </div>
            )
        })}

        </div>
        <Paginated 
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paged= {paged}
        /> 
         

        </div>
    )
}

