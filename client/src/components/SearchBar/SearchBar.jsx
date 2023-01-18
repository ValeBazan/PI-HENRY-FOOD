import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../actions";
import s from './SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch();

    //creo un estado local
    const [name, setName] = useState('')
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameRecipes(name)) // lo que escribe el usuario
    }


    return (
        <div className={s.searchBar}>
            <input type="text" placeholder="Search by name..." onChange={(e)=> handleInputChange(e)}/>
            <button type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
};