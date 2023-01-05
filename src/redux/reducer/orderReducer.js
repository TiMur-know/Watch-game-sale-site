import { SET_ORDER_ASC,SET_ORDER_NAME} from "../actions";
import initialState from "./initialState";

const orderReducer=(state=initialState.orderBy,action)=>{

    switch(action.type){
        case SET_ORDER_NAME:
            return action.name
        case SET_ORDER_ASC:
                return action.asced
            default:
                return state;
    }
}

export default orderReducer;