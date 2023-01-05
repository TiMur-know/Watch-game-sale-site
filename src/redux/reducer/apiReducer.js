import initialState from "./initialState";
import {SET_API_LOADING,SET_API_ERROR,SET_API_SUCCESS} from '../actions'
const getAPI = (state = initialState.Api, action) => {
    switch (action.type) {
      case SET_API_LOADING:
        return {
          ...state,
          loading: true
        };
      case SET_API_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: ""
        };
      case SET_API_ERROR:
        return {
          ...state,
          loading: false,
          data: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
export default getAPI;