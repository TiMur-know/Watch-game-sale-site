import React from 'react'
import {addGenreToFilter,removeGenreToFilter } from '../redux/actions'
import {connect} from 'react-redux'
const Filters=(props)=>{
    //const {dispatch,genreItemCount}=props
    const {genres}=props
const handleSelectBox=(e)=>{
    const name=e.target.name;
    const {addGenre,deleteGenre}=props;
    //e.target.checked ? dispatch(addGenreToFilter(name)): dispatch(removeGenreToFilter(name));
    e.target.checked ? addGenre(name): deleteGenre(name);
}
return(
    <div className="card">
        <div className='card-header'>
            <h6>Genres</h6>
        </div>
        <ul className="list-group">
            {genres.map(genre=>(
                <li className="list-group-item">
                    <input type="checkbox" name={genre} className="form-check-input" onInput={handleSelectBox} id={genre} />
                    <label className="form-check-label" htmlFor={genre}>
                     {genre}
                    </label>
                </li>
            ))}
            </ul>

    </div>
)
}
const mapStateToProps=(state)=>{
    /*const genreItemCount={}
    state.games.forEach(element => {
        genreItemCount[element.genre]=genreItemCount[element.genre]+1||1
    });
    return {genreItemCount};*/
    return{
        genres:state.genres
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        addGenre:(genre)=>dispatch(addGenreToFilter(genre)),
        deleteGenre:(genre)=>dispatch(removeGenreToFilter(genre))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Filters)