import './App.css';
import Menu from './component/Menu';
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import Main from './component/Main';
import FiltersAndSortBar from './container/FilterBar';
import Footer from './component/Footer';
import { Get_data, get_data } from './utils/functions';
import { getApiResources } from './utils/network';
import Routeres from './component/Routings';
import Test from './component/Test';
import ShowMain from './component/ShowMain';
import NavBar from './component/NavBar';
const App=()=> {
  return (
    <div className="container-fluid">
      <Provider store={store}>
        <div>
      <Router>
      <NavBar/>
      <div className='row'>
        
      <FiltersAndSortBar />
            <ShowMain/>
            </div>
            </Router>
      </div>
    <Footer/>
      </Provider>
    </div>
    
  );
}

export default App;
