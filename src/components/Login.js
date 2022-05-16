import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startFacebookAuth, startGoogleAuth, startTradicionalAuthAsync } from '../redux/Actions/authAction';
import '../styles/login.css';


export default function Login({setIsLoggedIn, setChecking}) {

  const dispatch = useDispatch();
  const [objUser, setObjUser] = useState({nameUser: '', password: ''});

  return (
    <div className='background'>
      <NavLink to='/register'className='link-register'>Registrarse</NavLink>
      <div className='container-login '>
        <form action="" className='card-login form-login' onSubmit={(e)=>{
          e.preventDefault()
          dispatch(startTradicionalAuthAsync(objUser, setIsLoggedIn, setChecking))
          }}>
          <div>
            <label htmlFor="" className='label-login'>Usuario: </label>
            <TextField 
              className='input-login'
              id="outlined-basic" 
              label="Outlined" 
              variant="outlined" 
              name='user'
              onChange={(e)=> setObjUser({...objUser, nameUser: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="" className='label-login'>Contraseña: </label>
            <TextField
              className='input-login'
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name='password'
              onChange={(e)=> setObjUser({...objUser, password: e.target.value})}
            />
          </div>
          <Button 
            type='submit'  
            variant="contained"
          >Entrar</Button>
        </form>
        <span className='card-login login-google' onClick={()=> dispatch(startGoogleAuth())}>
          Inicia sesion con Google
          <FontAwesomeIcon icon={faGoogle} />
        </span>
        <span className='card-login login-facebook' onClick={()=> dispatch(startFacebookAuth())}>
          Inicia sesion con Facebook
          <FontAwesomeIcon icon={faFacebook} />
        </span>
      </div>
    </div>
  )
}
