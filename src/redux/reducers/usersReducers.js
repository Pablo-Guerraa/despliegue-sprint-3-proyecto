import { typeUsers } from "../types/types";

const initialState = [];

export const usersReducer = ( state= initialState, action) => {
  switch(action.type){
    case typeUsers.users: 
      return {
        initialState
      }
    case typeUsers.register: 
      return [
        ...state,
        action.payload
      ];
    case typeUsers.edit:
      return state
    case typeUsers.delete:
      return state.filter(element => element.email !== action.payload)
    default:
      return state;
  }
}