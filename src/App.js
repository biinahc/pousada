
import Home from './components/Home';
import Users from './components/Users';
import Produtos from './components/Produtos';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';



function App () {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

const handleLogin = () => { 

  setIsAuthenticated(true); 

}; 

  
  return (
      <div>

<Router> 

    <Routes> 

      <Route path="/" element={<Login onLogin={handleLogin} />} /> 
      <Route path="/home"  element={isAuthenticated ? <Home /> : <Navigate to="/" />}/> 
      <Route path="/usuarios"   element={<Users/>} />
      <Route path="/produtos"   element={<Produtos/>} />
      


    </Routes> 

</Router> 

    </div>
  );
}

export default App;
