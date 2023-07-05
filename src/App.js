import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Bookbus from './components/Bookbus';
import Busdetail from './components/Busdetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/searchbuses' element={<Bookbus/>}/>
     <Route path='/busdetail/:busid' element ={<Busdetail/>}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
