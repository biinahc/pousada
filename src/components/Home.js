import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';




   


function Home(){

    const link = {
        textDecoration: 'none',
         color:'#FFFFFF'
      
         
       };

   return (  

        <div> 
        <Header/>
        
 <br/>
 <br/>
 <br/>

<div class="home container ">

  <div class="row">

    <div class="col"> 
    <div class="card">
  <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
    <img src="https://as2.ftcdn.net/v2/jpg/06/24/33/91/1000_F_624339153_zyidXmC8A8yJMwql04TP92xWXOEHLIrK.jpg" class="img-fluid"/>
    <a href="#!">
      <div class="mask" style={{background:'#87CEEB'}}></div>
    </a>
  </div>

  
  <div class="card-body ">
    <h5 class="card-title">Administrar usuarios</h5>
    <p class="card-text"></p>
    <a className="btn btn-info btn-md"  data-mdb-ripple-init>
        <Link to="/usuarios" style={link}>Gerênciar</Link>
    </a>
  </div>
  </div>
    </div>

    
    <div class="col">
      
    </div>
    <div class="col">
    <div class="card">
  <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
    <img src="https://blog.pontte.com.br/wp-content/uploads/2022/08/giro-de-estoque.jpg" class="img-fluid"/>
    <a href="#!">
      <div class="mask" style={{background:'#87CEEB'}}></div>
    </a>
  </div>




  <div class="card-body">
    <h5 class="card-title">Administrar Produtos</h5>
    <p class="card-text"></p>
    <a className="btn btn-info btn-md"  data-mdb-ripple-init>
    <Link to="/produtos" style={link}>Gerênciar</Link></a>
  </div>
</div>
    </div>


  </div>

</div>



<Outlet />
<Footer />



  </div>



);
 
}

export default Home;