import { useEffect } from "react"
import { connect } from "react-redux"

import getApiData from "../utils/network"
import ListComp from "./ListComp"

import {getGenresFromGame} from '../utils/functions'
import { clearFilters, getGamesForServer, getGenresForServer } from "../redux/actions"
import LoadingPage from "./LoadingPage"
import FiltersAndSortBar from "../container/FilterBar"

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
    const {data,loading,error,setGames,setGenres,filter,cleareFilters}=props
    let url=ht+site+filter
    useEffect(()=>{
        let {getData}=props;
        getData(url)
        cleareFilters()
    },[filter])
    if(loading) return (<LoadingPage/>)
    else{
        if(data.length!==[].length){
            setGames(data);
            setGenres(getGenresFromGame(data))
        }
        else if(error!=='') return (<h3>{error}</h3>)
        return(
            <div className="row">
            <FiltersAndSortBar />
            <ListComp/>
            </div>
        )
    }
}
const mapStateToProps=(state,ownProps)=>({
    error:state.dataApi.error,
    loading: state.dataApi.loading,
    data: state.dataApi.data,
    filter:ownProps.filter
});
const mapDispatchToProps=(dispatch)=>{
    return {
        getData:url=>dispatch(getApiData(url)),
        setGames:data=>dispatch(getGamesForServer(data)),
        setGenres:genres=>dispatch(getGenresForServer(genres)),
        cleareFilters:()=>dispatch(clearFilters())
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(Routings) 