import React from 'react';
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css'

export default function LandingPage(){
    return(
    <div className={s.page}>
        <div className={s.landing}>
            <h1> Welcome! Find recipes according to your preferences or diet, and add your favorite recipes. </h1>
            <Link to='/home'>
                <button className={s.homeButton}>Let's go!</button>
            </Link>
        </div>
    </div>
    )
}