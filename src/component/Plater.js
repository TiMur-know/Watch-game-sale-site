import React from "react"
const Plater=(props)=> {
       const {
        name,
        discount_percent,
        original_price,
        final_price,
        currency,
        link,
        genres,
        large_image,
        small_image,
        medium_image,
        shop
       }=props.game
      return (<div className="card " >
        <div className="card-body" >
      <h1 className="card-title"><a href={link} >{name}</a></h1>
      <img className="card-img-bottom" src={large_image} alt="..."/>
      
      <div>Цена: {final_price}/{original_price} {currency}</div>
      <div>{discount_percent}%</div>
      <div>{shop}</div>
      <div>Жанры: {genres}</div>
      
      </div>
      </div>)
    }
Plater.defaultProps={link:"/#",name:"Название"}
export default Plater;
