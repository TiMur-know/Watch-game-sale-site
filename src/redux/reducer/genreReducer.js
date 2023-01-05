import { ADD_GENRE_TO_FILTER, REMOVE_GENRE_TO_FILTER } from "../actions";
const initialState={
    genres:[]
}
export const genreFilterReducer=(state=initialState,action)=>{
switch(action.type){
    case ADD_GENRE_TO_FILTER:
        if(state.genres.includes(action.value)) return state;
        state.genres.push(action.value) ;
            return state
        case REMOVE_GENRE_TO_FILTER:
            if(!state.genres.includes(action.value)) return state;
            state.genres.pop(action.value)
            return state
        default:
            return state;
}
}
export default genreFilterReducer