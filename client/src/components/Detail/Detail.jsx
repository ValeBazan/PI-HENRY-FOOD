import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../actions";
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
        <div className={s.mainDetail}> 
        
        {myRecipe.length >0 ? 
            
             <div key={myRecipe[0].id}>
            
                    <Link to='/home'>
                        <button className={s.backButton}>Back</button>
                    </Link>
                <h1 className={s.name}>{myRecipe[0].name}</h1>
                <div className={s.detailContainer}>
                    <div className={s.leftContainer}>
                        <img className={s.image} src={myRecipe[0].image} alt="" />
                        <h4 className={s.healthScore}>Health Score: {myRecipe[0].healthScore}</h4>
                    </div>
                    <div className={s.rightContainer}>

                    <p className={s.detailSummary}>{myRecipe[0].summary.replace(/<[^>]*>/g, '')}</p>
                    <div>
                    <h4 className={s.dietTypes}>Diet Types</h4>
                    {myRecipe[0].diets.map(el=> <li className={s.detailDiets} key={el}>{el}</li>)} 
                    </div>
                    <h4>Instructions</h4>
                    <ol>{myRecipe[0].steps.map(el=> <li className={s.detailSteps} key={el}>{el}</li>)}</ol>
                    {/* <h4>Dish type:</h4>
                    {myRecipe[0].types.map(el=> <li className={s.detailSteps} key={el}>{el}</li>)} */}
                    </div>
                </div>
            
            </div>:<p>Loading...</p>
            } 

           

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