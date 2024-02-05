import Filters from "../component/Filters"
import Sort from "../component/Sort"
import './FilterBar.css'
const FiltersAndSortBar=(props)=>{
    return(
    <div /*className="col-sm-2 col-lg-1 col-xxl-2 col-xl-3 col-md-3"*/ className="col-sm-3 sidenav">

                    <div className="card">
                        <div className="container">
                        <div className="row g-1">
                        <h5>Sort and filters</h5>
                        
                        <Sort/>
                        <Filters/>
                        </div>
                        </div> 
                        </div>

            </div>
            )
}
export default FiltersAndSortBar