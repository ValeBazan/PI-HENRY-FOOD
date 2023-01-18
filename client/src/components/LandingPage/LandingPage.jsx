import React from 'react';
import {Link} from 'react-router-dom';
import s from './LandingPage.module.css'

export default function LandingPage(){
    return(
    <div className={s.page}>
        <div className={s.landing}>
            <h1> Welcome to Henry Food! </h1>
            <h3>Where you can find the best recipes and create your own...</h3>
            <Link to='/home'>
                <button className={s.homeButton}>Start</button>
            </Link>
        </div>
    </div>
    )
}