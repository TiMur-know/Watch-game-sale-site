import { useEffect } from "react";
import { connect } from "react-redux";
import { genreFilter, order } from "../utils/functions";
import Plate from "./Plate";
import Plater from "./Plater";

const ListComp=(props)=>{
    const {games}=props
    return (
        <div className="col-md-9 ">
        <div className="row">
            {/*games.map(gam=><Plater game={gam}/>)*/}
            {games.map(game=>< Plate 
            img={game.large_image}
            name={game.name} 
            percent={game.discount_percent} 
            original_price={game.original_price} 
            final_price={game.final_price} 
            currency={game.currency} 
            genres= {game.genres} 
            shop={game.shop}
            />)
            }
        </div>
        </div>
    )
}
const mapStateToProps = (state)=>{
    const genres =state.genresFilter.slice();
    const orderBy= state.orderBy;
    const games=state.gameList.slice()
    const filterByGenre=genreFilter(games,genres)
    const filterByOrder=order(filterByGenre,orderBy)
    return {games:filterByOrder}
}
export default connect(mapStateToProps,null)(ListComp);