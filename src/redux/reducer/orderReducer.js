import { SET_ORDER_ASC,SET_ORDER_NAME} from "../actions";
import initialState from "./initialState";

const orderReducer=(state=Object.assign(initialState.orderBy),action)=>{

    switch(action.type){
        case SET_ORDER_NAME:
            return Object.assign({
                name: action.name,
                asced: state.asced
            })
        case SET_ORDER_ASC:
                return Object.assign({
                    name:state.name,
                    asced: action.asced
                })
            default:
                return state;
    }
}

export default orderReducer;