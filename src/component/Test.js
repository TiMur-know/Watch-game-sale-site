import FiltersAndSortBar from "../container/FilterBar"
import Footer from "./Footer"
import NavBar from "./NavBar"
import ShowMain from "./ShowMain"

const Test=()=>{
return(
    <div>
        <NavBar/>
        <div className="row">
        <FiltersAndSortBar/>
        <ShowMain/>
        </div>
        <Footer/>
    </div> 
)
}
export default Test