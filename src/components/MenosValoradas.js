import React from 'react'
import { useSelector } from 'react-redux';
import Card from './Card';

export default function MenosValoradas() {

  const movies = useSelector((state) => state.movies)

  const filterMovies = () => {
    const filterPeli = movies?.filter(movie => movie.imDbRating < 7);
    return filterPeli;
  }

  return (
    <div className='cards-home'>
    {
      filterMovies().map(movie => (
        <Card key={movie.id} element={movie}/>
      ))
    }
  </div>
  )
}
