import { ADD_GENRE_TO_FILTER, REMOVE_GENRE_TO_FILTER } from "../actions";
import initialState from "./initialState";

export const genreFilterReducer=(state=initialState.genreFilters,action)=>{
switch(action.type){
    case ADD_GENRE_TO_FILTER:
        if(state.includes(action.value)) return state;
        state.push(action.value) ;
            return state
        case REMOVE_GENRE_TO_FILTER:
            if(!state.includes(action.value)) return state;
            state.pop(action.value)
            return state
        default:
            return state;
}
}
export default genreFilterReducer