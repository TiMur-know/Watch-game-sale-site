/*export const getApiResource=(url)=>{
   return fetch(url)
   .then(res=>res.json())
    .then(body=>console.log(body))
    .catch(error=>console.log(error.message))
}/*
const ele=getApiResource().then(body=>console.log(body))
let name;
ele.then(name)
console.log(ele)
console.log(name)*/
/*export const getApiResources = async (url) => {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            console.error('Could not fetch.', res.status);
            return false;
        }

        return await res.json(); 
    } catch (error) {
        console.error('Could not fetch.', error.message);
        return false;
    }
}
async function getApiData(url){
    const a=await axios.get(url)
    console.log(a)
    return a
 }
function Result(url){
    
    console.log(getApiData(url))
}
Result("http://localhost:3001/api/steam")*/
import axios from "axios";
import { apiPending, apiSuccess, apiError } from "../redux/actions";
export function fetchData(url) {
    return (dispatch) => {
      dispatch(apiPending());
      axios
        .get(url)
        .then((res) => dispatch(apiSuccess(res.data)))
        .catch((err) => dispatch(apiError(err.message)));
    };
  }
  export default fetchData