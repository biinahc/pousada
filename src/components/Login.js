
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Logo from './login.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function Login({ onLogin }) {


  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();



  const handleUsuario = (event) => {
    setUsuario(event.target.value);

  };

  const handleSenha = (event) => {
    setSenha(event.target.value);

  };


  let name = usuario;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', { name, senha });
      setMessage(response.data.message);
      console.log(message);
      onLogin();
      navigate('/home');
    } catch (error) {
      console.log(error);
      setMessage('Login failed');
    }
  };



  return (

    <div className="login container mb-2 " > 
      <div className="row justify-content-center ">

        <div className="col-15 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">

          <div className="mb-4">

            <div className="text-center mb-2">

              <img src={Logo} alt="BootstrapBrain Logo" width="150" height="150" />
            </div>
            <h1 className="text-center  mb-3">Sistema de Gestão</h1>

          </div>

          <form className="form rounded-bottom border-light p-3 " action="#!">
            <h4 className='p-1 text-center'>Entrar</h4>
            <div className="row gy-3 overflow-hidden">
              <div className="col-12">
                <div className="form-floating mb-2">
                  <input type="text" required className="form-control" name="usuario" value={usuario} onChange={handleUsuario} id="usuario" placeholder="Usuario" />
                  <label for="email" className="form-label">Usuário</label>

                </div>
              </div>
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" name="senha" id="senha" value={senha} onChange={handleSenha} placeholder="Senha" required />
                  <label htmlFor="password" className="form-label">Senha</label>
                </div>
                <div id="emailHelp" className="form-text text-danger text-center">Problemas para acessar? Procurar Setor responsável !</div>

              </div>

              <div className="col-12">
                <div className="d-grid  ">
                  <Button label="Entrar" className="btn btn-warning" icon="pi pi-user" onClick={handleLogin} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>



  );

}

export default Login;