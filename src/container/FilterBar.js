import Filters from "../component/Filters"
import Sort from "../component/Sort"
const FiltersAndSortBar=(props)=>{
    return(
    <div className="col-sm-2 col-lg-1 col-xxl-2 col-xl-3 col-md-3">
                <div className="row">
                    <div className="card">
                        <h5>Sort and filters</h5>
                        <Sort/>
                        <Filters/>
                        </div>
                </div>
            </div>
            )
}
export default FiltersAndSortBar