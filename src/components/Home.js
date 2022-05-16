import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import TextMobileStepper from '../components/Carousel';
import MoviesAll from '../components/MoviesAll';
import MasValoradas from '../components/MasValoradas';
import MenosValoradas from '../components/MenosValoradas';
import NavBar from '../components/navbar';
import { moviesAllAsync } from '../redux/Actions/moviesAction';
import '../styles/app.css' 

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(moviesAllAsync())
  },[])

  return (
    <div className='bg'>
      <TextMobileStepper/>
      <Routes>
        <Route path='/' element={<MoviesAll/>}/> 
        <Route path='/mas-valoradas' element={<MasValoradas/>}/>
        <Route path='/menos-valoradas' element={<MenosValoradas/>}/>
        <Route path='/*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}
