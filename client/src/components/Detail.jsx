import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../actions";
import { useEffect } from "react";
import s from './Detail.module.css'

export default function Detail(){
    
    const dispatch = useDispatch();
    const { id } = useParams();
   
    const myRecipe = useSelector((state)=> state.detail) // me traigo el estado del reducer 
    
    useEffect(()=>{ 
        dispatch(getDetail(id)) //accedo el id a traves de las params
    }, [id]) 

    console.log(id)
    console.log(myRecipe)
    return(
        <div className={s.detail}> 
        
        {myRecipe.length >0 ? 
            
             <div key={myRecipe[0].id}>

                <h1 className={s.name}>{myRecipe[0].name}</h1>
                <img className={s.image} src={myRecipe[0].image} alt="" />
                <p>{myRecipe[0].summary.replace(/<[^>]*>/g, '')}</p>
                <h3>Health Score: {myRecipe[0].healthScore}</h3>
                {myRecipe[0].diets.map(el=> <h3 key={el}>{el}</h3>)} 
                {myRecipe[0].steps.map(el=> <p key={el}>{el}</p>)}
                <h3>Dish type:</h3>
                {myRecipe[0].types.map(el=> <p key={el}>{el}</p>)}
        
            </div>:<p>Loading...</p>
            } 

           
        <Link to='/home'>
            <button>Back</button>
        </Link>

            </div>
    )

} 






// export default function Detail() {

//     const dispatch = useDispatch(); 
//     const { name, image, summary, healthScore, diets, steps} = useSelector((state) => state.recipe);
  
//     const { id } = useParams();
  
//     useEffect(() => {
//       dispatch(getDetail(id))
//     }, [id])
  
  
//     return (
//       <div className="recipeInfoContainer">
  
//         <div className="infoCard" >
  
//           <h1>{name}</h1>
  
//           <div id="dietsInfo">
//             {diets?.map(diet => <h5 key={diet}> {diet} </h5> )}
//           </div>
  
//           <span> Health Score: {healthScore}</span>
  
//           <img src={image} alt={`Image of ${name}`} />
  
//           <div className="infoContainer" >
  
//             <p>{summary}</p>
  
//             <div>
//               {steps?.map(step => (
//                 <div key={step.step}>
//                   <h4>Step: {step.step}</h4>
//                   <p> {step.do} </p>
//                 </div>
//               ))}
//             </div>
//           </div>
  
//         </div>
  
//       </div>
//     )
//   }