import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './pages/login';
import Settings from './pages/settings';
import Register from './pages/register';
import Home from './pages/home';
import History from './pages/history';
import Timer from './pages/timer';
import './App.css';

function App() {
   const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
   });
   
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login setUser={setUser}/>}/>
          <Route path="/register" element={<Register user={user}/>}/>
          <Route path="/home" element={<Home user={user}/>}/>
          <Route path="/timer" element={<Timer user={user}/>}/>
          <Route path="/settings" element={<Settings user={user}/>}/>
          <Route path="/history" element={<History user={user}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
