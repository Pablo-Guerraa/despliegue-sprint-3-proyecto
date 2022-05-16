import { typeAuth } from "../types/types";

const initialState = {
  uid: null,
  displayName: null,
  email: null,
  photo: null
};

export const authReducer = ( state= initialState, action) => {
  switch(action.type){
    case typeAuth.login: 
      return {
        uid : action.payload.uid,
        name : action.payload.displayName,
        email: action.payload.email,
        photo: action.payload.photo
      }
    case typeAuth.logout: 
      return initialState;

    default:
      return state;
  }
}