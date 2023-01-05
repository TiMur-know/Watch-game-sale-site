import { Router,Link } from "react-router-dom"
const NavBar=()=>{
    return(
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
)
        
}
export default NavBar