import { connect } from "react-redux";
import { genreFilter, order } from "../utils/functions";
import Plate from "./Plate";
import Plater from "./Plater";

const ListComp=(props)=>{
    let games=props.games;
    return (
        <div className="col-md-6 mb-4">
            <div>This work</div>
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
    const genres =state.genresFilter;
    const orderBy=state.orderBy;
    const games=state.gameList;
    const filterByGenre=genreFilter(games,genres)
    const filterByOrder=order(filterByGenre,orderBy) 
    return {games:filterByOrder}
}
export default connect(mapStateToProps,null)(ListComp);