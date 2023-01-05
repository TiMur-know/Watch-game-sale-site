import { useEffect } from "react"
import { connect } from "react-redux"
import { Route,Routes } from "react-router-dom"
import getApiData from "../utils/network"
import ListComp from "./ListComp"
import Main from "./Main"
import {getGenresFromGame} from '../utils/functions'

/*{
    <Routes >
                <Route index path="/" element={<Routeres filter="all"/>}/>
                <Route path="/steam" element={<Routeres filter="steam"/>} />
                <Route path="/epic-games" element={<Routeres filter="epic"/>} />
                <Route path="/gog" element={<Routeres filter="gog"/>} />
                <Route path="/origin" element={<Routeres filter="origin"/>} />
            </Routes>
}*/
const Routings=(props)=>{
    let ht="http://"
    let site="localhost:3001/api/"
    let filter=props.filter;
    let d=ht+site+filter
    const {data,loading,error,setGames,setGenres}=props
    useEffect(()=>{
        let {getApiData}=props;
        getApiData(d)
    },[])
    if(loading) return (<h3>Loading...</h3>)
    else{
        if(data.length!==[].length){
            setGames(data);
            setGenres(getGenresFromGame(data))
        }
        else if(error!=='') return (<h3>{error}</h3>)
        return(
            <ListComp/>
        )
    }
    
  /*  http://localhost:3001/api/steam*/
}
const mapStateToProps=(state,ownProps)=>({
    error:state.dataApi.error,
    loading: state.dataApi.loading,
    data: state.dataApi.data,
    filter:ownProps.filter
});
const mapDispatchToProps=(dispatch)=>{
    return {
        getData:url=>dispatch(),
        setGames:data=>dispatch(),
        setGenres:genres=>dispatch(),
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(Routings) 