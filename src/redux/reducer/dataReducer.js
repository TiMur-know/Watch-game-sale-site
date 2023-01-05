import { getGenresFromGame } from "../../utils/functions";
import { GAMES_FOR_SERVER,GENRE_FOR_SERVER } from "../actions";
import initialState from "./initialState";
export const genreList=(state=getGenresFromGame(initialState.games),action)=>{
    switch (action.type) {
      case GENRE_FOR_SERVER:
        if(action.genres!==[])
          return action.genres;
          else return state
      default:
        return state;
    }
}
export const gamesList=(state=initialState.games,action)=>{
    switch (action.type) {
        case GAMES_FOR_SERVER:
          if(action.games!==[])
          return action.games;
          else return state
        default:
          return state;
}
}