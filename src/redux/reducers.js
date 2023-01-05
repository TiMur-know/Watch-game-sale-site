import { combineReducers } from "redux";
import genreReducer from "./reducer/genreReducer";
import orderReducer from "./reducer/orderReducer";
import listReducer from "./reducer/listReducer";
import siteReducer from "./reducer/shopReducer";
const reducers=combineReducers({
    siteLink:siteReducer,
    genresFilter:genreReducer,
    orderBy:orderReducer,
    gameList:listReducer
})
export default reducers;