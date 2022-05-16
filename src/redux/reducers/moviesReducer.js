import { typeMovies } from "../types/types";

// const initialState = null;

export const moviesReducer = ( state = [], action) => {
  switch(action.type){
    case typeMovies.getMovies: 
      return   action.payload
    case typeMovies.nextMovies:
      return [...state, ...action.payload]

    default:
      return state;
  }
}