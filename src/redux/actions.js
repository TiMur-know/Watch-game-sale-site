export const ADD_GENRE_TO_FILTER='ADD_GENRE_TO_FILTER'
export const REMOVE_GENRE_TO_FILTER='REMOVE_GENRE_TO_FILTER'


export const CHANGE_SHOP='CHANGE_SHOP'
export const GAMES_FOR_SERVER='GAMES_FOR_SERVER'
export const GENRE_FOR_SERVER = "GENRE_FOR_SERVER";
export const SET_API_LOADING = "SET_API_LOADING";
export const SET_API_SUCCESS = "SET_API_SUCCESS";
export const SET_API_ERROR = "SET_API_ERROR";
export const SET_ORDER_ASC = "SET_ORDER_ASC";
export const SET_ORDER_NAME = "SET_ORDER_NAME";
export const getGamesForServer=(games)=>({
    type:GAMES_FOR_SERVER,
    games
})
export const getGenresForServer=(genres)=>({
    type:GENRE_FOR_SERVER,
    genres
})

export const addGenreToFilter=(genre)=>({
    type:ADD_GENRE_TO_FILTER,
    value:genre
})
export const removeGenreToFilter=(genre)=>({
    type:REMOVE_GENRE_TO_FILTER,
    value:genre
})
export const setOrderName=(name)=>({
    type:SET_ORDER_NAME,
    name
})
export const setOrderAsc=(asced)=>({
    type:SET_ORDER_ASC,
    asced
})

export const changeShop=(shop="")=>({
    type:CHANGE_SHOP,
    value:shop
})

export const apiPending = () => {
    return {
      type: SET_API_LOADING
    };
  };
  export function apiSuccess(data) {
    return {
      type: SET_API_SUCCESS,
      payload: data
    };
  }
  export function apiError(error) {
    return {
      type: SET_API_ERROR,
      payload: error
    };
  }