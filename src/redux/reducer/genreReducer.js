import { ADD_GENRE_TO_FILTER, REMOVE_GENRE_TO_FILTER,CLEAR_FILTER } from "../actions";
import initialState from "./initialState";

export const genreFilterReducer=(state=initialState.genreFilters.slice(),action)=>{
switch(action.type){
    case ADD_GENRE_TO_FILTER:
        if(state.includes(action.value)) return state;
        state.push(action.value) ;
            return state.slice()
        case REMOVE_GENRE_TO_FILTER:
            if(!state.includes(action.value)) return state;
            state=state.filter(elem=>elem!==action.value)
            return state.slice()
        case CLEAR_FILTER:
                state=[]
                return state.slice()
        default:
            return state;
}
}
export default genreFilterReducer