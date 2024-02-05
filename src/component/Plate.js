import React from "react"
import "./css/Plate.css"

function Plate(props) {
      return (

        <div className="col-sm-5 col-lg-3 ">
      <div className="card d-flex flex-column plate" >
        <img className="card-img-top w-100" src={props.img} alt="..."/>
        <div className="card-body" >

        <a href={props.link} className="stretched-link"></a>
        <div className="badge text-bg-dark">{props.shop}</div>
        <h3 className="card-title">{props.name}</h3>
      <div className="d-flex justify-content-between">
      <div className="d-flex align-items-center fs-6 badge text-bg-danger mb-2">-{props.percent} %</div>
        <div className="fw-bold">
        <div className="text-decoration-line-through">{props.currency}{props.original_price} </div>
        <div className="text-danger ">{props.currency}{props.final_price} </div>
        </div>
      </div>
      </div>
      <div className="card-footer">
        {props.genres.map(option=><div className="col">{option}</div> )}
      </div>
      </div>
      </div>)
    }
Plate.defaultProps={link:"/#",name:"Название",genres:[]}
export default Plate;