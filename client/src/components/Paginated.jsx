import React from "react";
import s from './Paginated.module.css'

export default function paginated({recipesPerPage, allRecipes, paged}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {  // divido todas las recetas por las recetas por pag
        pageNumbers.push(i);
        
    }

return (
    <nav>
        <ul className={s.paginado}>
            {pageNumbers && pageNumbers.map(number=>(  //mapeo y devuelvo por cada uno de los numeros el paginado
            <li className={s.numberPage} key={number}>
                <button className={s.buttonNumber} onClick={()=> paged(number)}>{number}</button>
            </li>
            ))}
        </ul>
    </nav>
    )
}

