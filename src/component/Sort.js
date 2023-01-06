import { setOrderName, setOrderAsc, ORDER_BY_ASC, ORDER_BY_NAME } from "../redux/actions";
import { useState } from "react";
import { connect } from "react-redux";
import {  orders } from "../data/data";
import store from "../redux/store";
const Sort=(props)=>{
  /*let name="";
  let asc="";*/

const handleAscChange=(e)=>{
  const value =e.target.value;
  /*asc=value;
  dispatch(orderByName(name,value))*/
  const {setAsc}=props
  setAsc(value)
}
 const handleNameChange=(e)=>{
  const value=e.target.value;
  /*name=value
  dispatch(orderByName(value,asc))*/
  const {setName}=props
  setName(value)
 }
 return (
  <div className="card">
    <div className="card-header"> <h6>Orders</h6></div>
    <div className="g-2">
    <select className="form-select" aria-label=".form-select-sm example" name="up_down" onChange={handleAscChange}>
      <option selected value="">Select odrering</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <select className="form-select" aria-label=".form-select-sm example" onChange={handleNameChange}>
      <option selected value="">Select order name</option>
      {orders.map(order=>(
      <option value={order.value}>{order.name}</option>
    ))}
    </select>
    </div>
  </div>
 )
}
const mapStateToProps=(state)=>({

})
const mapDispatchToProps=(dispatch)=>{
  return{
    setName:(name)=>dispatch(setOrderName(name)),
    setAsc:(asc)=>dispatch(setOrderAsc(asc))
  }
}
export default connect(null,mapDispatchToProps)(Sort);