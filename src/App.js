import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Tabs from './components/Tabs';
import EmployeeDetails from './components/Employee/Details/EmployeeDetails';
import UpdateDetails from './components/Employee/Update/UpdateDetails';
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <div>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Tabs></Tabs>}></Route>
        <Route path='/details/:id' element={<EmployeeDetails></EmployeeDetails>} />
        <Route path='/update_details/:id' element={<UpdateDetails></UpdateDetails>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
