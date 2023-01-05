import React from 'react'
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import Main from './Main';
function Menu() {
    return ( 
        <Router>
        <header>
        <nav>
            <ul className="nav">
                <li className="nav-item"><Link className='nav-link' to="/">Главная</Link></li>
                <li className="nav-item"><Link className='nav-link' to="/steam">Steam</Link></li>
                <li className="nav-item"><Link className='nav-link' to="/epic-games">Epic Games</Link></li>
                <li className="nav-item"><Link className='nav-link' to="/gog">GOG</Link></li>
                <li className="nav-item"><Link className='nav-link' to="/uplay">Uplay</Link></li>
            </ul>
        </nav>
            </header>
        </Router>
        
    )
    
}

export default Menu;