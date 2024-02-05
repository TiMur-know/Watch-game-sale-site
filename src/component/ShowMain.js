import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import ErrorPage from './ErrorPage';
import Routings from './Routings';
const ShowMain=()=>{
  return(
    
    <Routes >
              <Route index path="/" element={<Routings filter="all"/>} />
              <Route path="/steam" element={<Routings filter="steam"/>} />
              <Route path="/epic-games" element={<Routings filter="epic"/>} />
              <Route path="/gog" element={<Routings filter="gog"/>} />
              <Route path="/origin" element={<Routings filter="origin"/>} />
              <Route path="*" element={<ErrorPage/>} />
          </Routes>

          )
}
export default ShowMain;