import { get_data } from "../utils/functions";
function GetDatas (str){
    let url;
 if(str==="steam")
 url="http://localhost:3001/api/steam";
 else if(str==="epic")
 url="http://localhost:3001/api/epic"
 else if(str==="gog")
 url="http://localhost:3001/api/gog"
 else if(str==="origin")
 url="http://localhost:3001/api/origin"
 else if(str==="all")
 url="http://localhost:3001/api/all"
 //let res =get_data(url).then(result=>result,"")
 let res=get_data(url)
 return res
}

export default GetDatas;