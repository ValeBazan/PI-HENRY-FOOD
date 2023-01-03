import React from "react";
import s from './Card.module.css'

export default function Card({id,image, name, diets}){ 
    //console.log(diets)
    return(
        <div className={s.card}>
            <div>
            <h2 className={s.name}>{name}</h2>
            </div>
            <div>
            <img className={s.image} src={image} alt="Img not found"/>
            </div>
            <div>
                <div id="diets">
                    {diets?.map((diet, key) => <h5 key={key}>{diet}</h5>)} 
                </div>
            </div>
        </div>
    )

}

