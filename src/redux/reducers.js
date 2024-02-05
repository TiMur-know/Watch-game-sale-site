import { combineReducers } from "redux";
import { gamesList, genreList } from "./reducer/dataReducer";
import genreReducer from "./reducer/genreReducer";
import orderReducer from "./reducer/orderReducer";
import apiReducer from "./reducer/apiReducer"

import siteReducer from "./reducer/shopReducer";
const reducers=combineReducers({
    
    dataApi:apiReducer,
    siteLink:siteReducer,
    genresFilter:genreReducer,
    orderBy:orderReducer,
    gameList:gamesList,
    genres:genreList
})
export default reducers;