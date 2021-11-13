import './App.css';
import Bank from './components/add';
import React from "react";
import AddingNew from './components/addnewuser'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import Depositing from './components/depositing';


function App() {
 const [getUsersData , setGetUsersData] = React.useState([])

React.useEffect(()=>{
 getData()
},[])

 const getData = ()=>{
   axios.get('http://localhost:5000')
   .then(res=>{
     console.log(res.data);
     setGetUsersData(res.data)
   })
 }

  return (
    <div className="App">
     <Router className="App">
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/add">Home</Link>
            </li>
            <li>
              <Link to="/addnewuser">Add</Link>
            </li>
            <li>
              <Link to="/depositing">Depositing</Link>
            </li>
          </ul>
        </nav>
      
          <Routes>
            <Route  path='/add'  element={ <Bank data={getUsersData}/>} />
            <Route  path='/addnewuser' element={ <AddingNew data={getUsersData}/>} />
            <Route  path='/depositing' element={ <Depositing data={getUsersData}/>} />
          </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
