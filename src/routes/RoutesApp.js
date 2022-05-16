import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Register from '../components/Register';
import { login } from '../redux/Actions/authAction';
import DashboardRoutes from './DashboardRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

export default function RoutesApp() {

  // const users = useSelector((state)=>state.users);
  const dispatch = useDispatch();
  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, ( user )=> {
      if(user?.uid) {
        setIsLoggedIn(true);
        dispatch(login( user.uid, user.displayName, user.email, user.photoURL, ));
      }else {
        setIsLoggedIn(false);
      }
      setChecking(false)
    })
  }, [setIsLoggedIn, setChecking, dispatch, ]);

  if(checking) {
    return <h3>Cargando</h3>
  }
  
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path='/login' element={
          <PublicRoutes isLoggedIn={isLoggedIn}>
            <Login setIsLoggedIn={setIsLoggedIn} isChecking={setChecking}/>
          </PublicRoutes>
        }/>

        <Route path='/register' element={
          <PublicRoutes isLoggedIn={isLoggedIn}>
            <Register/>
          </PublicRoutes>
        }/>

        <Route path='/*' element={
          <PrivateRoutes isLoggedIn={isLoggedIn}>
            <DashboardRoutes setIsLoggedIn={setIsLoggedIn}/>
          </PrivateRoutes>
        }/>
      </Routes>

    </BrowserRouter>
  )
}
