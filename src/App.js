import './App.css';

import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';

import FiltersAndSortBar from './container/FilterBar';
import Footer from './component/Footer';
import ShowMain from './component/ShowMain';
import NavBar from './component/NavBar';
const App=()=> {
  return (
      <Provider store={store}>
        <div className='App'>
      <Router> 
      <NavBar/>
      <div className="container-fluid">

      
            <ShowMain/>
            </div>
            </Router>
    </div>
    <Footer/>
      </Provider>
  );
}

export default App;
