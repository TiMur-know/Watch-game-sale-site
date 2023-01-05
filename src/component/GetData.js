import { get_data } from "../utils/functions";
function GetData (str){
  let domen="http://localhost:3001/";
    let url="api/";
 //let res =get_data(url).then(result=>result,"")
 console.log(get_data(domen+url+str))
 return get_data(domen+url+str)
 
}
const red_Arr=(arr,filter)=>{
  let array=GetData(filter)
  if(array!==''||undefined)
  return array
  else return arr
}
export default GetData;