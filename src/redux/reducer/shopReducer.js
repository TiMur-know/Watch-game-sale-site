import { CHANGE_SHOP} from "../actions";
const siteReducer=(state='All',action)=>{
    switch(action.type){
        case CHANGE_SHOP: return action.value;
        default: return state;
    }
}

export default siteReducer;