import { Router,Link } from "react-router-dom"
import "./css/NavBar.css"
const NavBar=()=>{
    return(
        <header className="">
            <div className="container-fluid navBar">
        <nav>
            <ul className="nav ">
                <li className="nav-item "><Link className='nav-link ' to="/">Home</Link></li>
                <li className="nav-item"><Link className='nav-link' to="/steam">Steam</Link></li>
                {/*<li className="nav-item"><Link className='nav-link' to="/epic-games">Epic Games</Link></li>*/}
                <li className="nav-item"><Link className='nav-link' to="/gog">GOG</Link></li>
                {/*<li className="nav-item"><Link className='nav-link' to="/uplay">Uplay</Link></li>*/}
            </ul>
        </nav>
        </div>
            </header>
)
        
}
export default NavBar