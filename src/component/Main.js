import React from "react"
import { connect } from "react-redux";
import { genreFilter } from "../utils/functions";
import { redGen,getUnique } from "../utils/functions";
import Game from "./Game";
import GetData from "./GetData";
import Plate from "./Plate";
import Plater from "./Plater";


const Main=props=>{
      let getdata=""
      let data=""
      let res=[]
      
      if(props.filter===""){
        //getdata=GetData("all");
          res.push(new Game("ster",50,1945,1600,"E","https://google.com",
          ["gen 1","gen 2"],"https://cdn.britannica.com/24/2724-004-401141F5/Mirage.jpg?w=690&h=388&c=crop","","","shop"));
          res.push(new Game("se"));   
      }
      else if(props.filter==="steam"){
        getdata=GetData("steam");
        console.log(getdata)
      }
      else if(props.filter==="epic"){
        //getdata=GetData("epic");
        res.push(new Game("cneter"))
        res.push(new Game("er"));        
      }
      else if(props.filter==="gog"){
        getdata=GetData("gog");
      }
      else if(props.filter==="uplay"){
        //getdata=GetData("origin");
        //res.push(new Game())
        res.push(new Game("cneter"))
        res.push(new Game("er")); 
        
      }
      if(getdata!=="")
      data=JSON.parse(getdata)
      
      let genres=[]
      genres= (genres.concat(...res.map(option=>(option.genres)))).filter(elem=>elem!=null,undefined,'')
      genres=genres.map(elem=>(redGen(elem)))

      genres=getUnique(genres)

      for(let el of res){
        el.genres=el.genres!=null||undefined?el.genres.map(elem=>redGen(elem)):[""]
      }
      // создать из масива json масив game-ов после передвать game по Plater
      return(

      <div className="col-8">
        <div className="row">
        {/*arr.map(option=>(<Plater game={option}/>))*/}
        {res.map(option=>(<Plate 
          img={option.large_image}
          name={option.name} 
          percent={option.discount_percent} 
          original_price={option.original_price} 
          final_price={option.final_price} 
          currency={option.currency} 
          genres= {option.genres} 
          shop={option.shop} />))}
          </div>
      </div>
      )
}
const mapStateToProps=state=>{
  const genres=state.genres;
  const filterGenreArr=genreFilter(state.gameList.games,genres)
  return {games:filterGenreArr}
}
Main.defaultProps={filter:""}
export default connect(mapStateToProps)(Main);