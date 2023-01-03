import React from "react";
import { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { addRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import s from './RecipeCreate.module.css'

function validate(input){   // input es mi estado local
    let errors = {}
    if (!input.name) errors.name = 'Please complete with a recipe name';
    if (!input.summary) errors.summary = 'Please add some comments about your recipe';
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
    if (!input.steps.length) errors.steps = 'Please detail the steps for your recipe';
    if (!input.diets.length) errors.diets = 'You must select at least one diet type';
    return errors;
}

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state)=> state.diets)
    const [errors, setErrors] = useState({})
    
 
    
    const [input, setInput] = useState({ //creo el estado y le paso todo lo que necesita el post
        name: ''  ,
        image: '',
        summary: '',
        healthScore: '',
        steps: [], 
        diets: []
    })
    //console.log(input);
    const [step, setStep] = useState(''); 


    useEffect(()=> {  //cuando se monta el compornente trae todo
        dispatch(getDiets())
    }, [dispatch]);
    //console.log(diets)
    
    const addStep = (e) => {
        setInput({
            ...input, 
            steps: [...input.steps,step]})
            setStep('')
        console.log(input)
      };
 

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(addRecipe(input))
        alert('Recipe created successfully!')
        setInput({     //limpio el input
            name: '',
            image: '',
            summary: '',
            healthScore: '',
            steps: [],
            diets: []
        })
        history.push('/home')
    }
    //console.log(input)
    
    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets, e.target.value] //guardo en un [] todo lo q vaya seleccionando
        })
        //console.log(input.diets)
    }

    function handleChange(e){ //maneja cada vez que se modifican los inputs
        setInput({    //guardo las cosas que el usuario escribe en los inputs
            ...input,
            [e.target.name] : e.target.value
        })

        setErrors(validate({
          ...input,
          [e.target.name] : e.target.value  
        }))   
        //console.log(input)
    }
   
    function handleChangeStep(e){ 
            setStep(
             e.target.value
            )
            console.log(step)
        }

    console.log(input)

    return(
    <div className={s.recipeCreate}>
          <Link to='/home'><button className={s.backButton}>Back</button></Link>
          <form className={s.form} onSubmit={(e)=> handleSubmit(e)}>
          <h2 className={s.title}>Create your recipe!</h2>
            <div>
                <label className={s.label}>Name: </label>
                <input
                    type= 'text'
                    value= {input.name}
                    name = 'name'
                    onChange={(e)=> handleChange(e)}
                    className={s.input}
                />
                  {errors.name && (
                    <p className="errors">{errors.name}</p> )}
            </div>
            <div>
                <label className={s.label}>Image: </label>
                <input
                    type= 'text'
                    value= {input.image}
                    name = 'image'
                    onChange={(e)=> handleChange(e)}
                    className={s.input}
                />
            </div>
            <div>
                <label className={s.label}>Summary: </label>
                <textarea
                    type= 'text'
                    value= {input.summary}
                    name = 'summary'
                    onChange={(e)=> handleChange(e)}
                    className={s.textarea}
                />
                  {errors.summary && (
                    <p className="errors">{errors.summary}</p> )}    
            </div>
            <div>
                <label className={s.label}>Health Score: </label>
                <input
                    type= 'number'
                    value= {input.healthScore}
                    name = 'healthScore'
                    onChange={(e)=> handleChange(e)}
                    className={s.input}
                /> 
                  {errors.healthScore && (
                    <p className="errors">{errors.healthScore}</p> )}   
            </div>
            <div>
       
                {/* {errors.steps && (
                    <p className="errors">{errors.steps}</p> )}      */}
            </div>
            <div className={s.instructions}>
              <label>Instrucctions</label>
              <div className="addStep">
                <input 
                    type= 'text'
                    value= {step}
                    name = 'steps'
                    onChange={(e)=> handleChangeStep(e)}
                    className={s.input}
                >
                </input>
                  {errors.steps && (
                    <p className="errors">{errors.steps}</p> )}     
                {/* <ul><li>{input.steps.map(el => el + ' -')}</li></ul> */}
                <button className={s.addStep} type='button'onClick={(e)=> addStep(e)}> Add Step</button>
              </div>
              <div><ol className={s.step}>{input.steps?.map(s=> <li>{s}</li>)}</ol></div>
            </div>

            <div className={s.diets}>
            <label>Diet Types: </label>
            <select onChange={(e)=>{handleSelect(e)}}>
            <option disabled>Diets</option>
                {diets?.map((el)=>
                <option key={el.name} value= {el.name}>{el.name}</option>)}
            </select>
            <ul className={s.liDiet}><li>{input.diets.map(el => el + ' -')}</li></ul>
 
            {errors.diets && (
                            <span className="errors">{errors.diets}</span>
                        )}

            </div>
            <button type="submit" className={s.submitButton}>Submit Recipe</button>
          </form>
        </div>
    )
}


