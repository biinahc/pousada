import React from "react";
import Logo from './PBC.png';
import { Outlet, Link } from "react-router-dom";
import Home from './Home';


function Header(){

    const link = {
      textDecoration: 'none',  
      color:'#363636'
       
     };




    return (  

        <div>

<link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />


<nav class="navbar navbar-expand-lg  bg-body-tertiary " style={{background:'#87CEEB'}}>
 
  <div class="container-fluid">
 
    <button
      data-mdb-collapse-init
      class="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

   
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
   
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src={Logo}
          height="50"
          alt="Pousada Bom Descanso"
          loading="lazy"
        />
      </a>
    
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link lni lni-home ">
           <Link to="/home" style={link}><strong> Inicio</strong></Link>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link  lni lni-users" >            
          <Link to="/usuarios" style={link}><strong>Usuarios</strong></Link>          
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link  lni lni-layers" >            
          <Link to="/produtos" style={link}><strong>Produtos</strong></Link>          
          </a>
        </li>
    
     

      <li class="nav-item">
          <a class="nav-link lni lni-popup" >             
          <Link to="/" style={link}><strong>Notificacoes</strong></Link>          
          </a>
        </li>
    
      </ul>


    </div>

    <ul class="navbar-nav d-flex flex-row me-1">
            <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" ><i class="fas fa-right-to-bracket fa-x2"></i> <Link to="/" style={link}><strong>Sair</strong></Link></a>
            </li>
            <li class="nav-item me-3 me-lg-0">
                <a class="nav-link text-white" > </a>
            </li>
            <li class="nav-item me-3 me-lg-0">
                <a class="nav-link text-white" > </a>
            </li>
     </ul>

    
  
  </div>
 
</nav>


 
   <Outlet />
  
   
      </div>
   

    );
     
}

export default Header;