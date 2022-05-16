import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore"
import { dataFilms } from "../../firebase/firebase-config"
import { typeMovies } from "../types/types"

export const moviesAll = (movies) => {
  return {
    type: typeMovies.getMovies,
    payload: movies
  }
}
export const moviesNext = (movies) => {
  return {
    type: typeMovies.nextMovies,
    payload: movies
  }
}

export const moviesAllAsync = () => {
  return async (dispatch) => {
    // const collectionMovies = await getDocs(collection(dataFilms, 'peliculas'))
    const collectionFilter = query(collection(dataFilms, 'peliculas'), limit(10))
    let collectionMovies = await getDocs(collectionFilter)
    const movies = []

    collectionMovies.forEach(movie => {
      movies.push({
        ...movie.data()
      })
    })
    dispatch(moviesAll(movies))
  }
}

export const moviesNextAsync = (movies) => {
  return async (dispatch) => {

    const collectionMoviesall = await getDocs(collection(dataFilms, 'peliculas'))

      const lastVisible = collectionMoviesall.docs[movies.length-1];
      const next = query(collection(dataFilms, "peliculas"),
      orderBy("title"),
      startAfter(lastVisible),
      limit(10));
      const collectionMovies = await getDocs(next)

    const newMovies = []

    collectionMovies.forEach(movie => {
      newMovies.push({
        ...movie.data()
      })
    })
    dispatch(moviesNext(newMovies))
  }
}