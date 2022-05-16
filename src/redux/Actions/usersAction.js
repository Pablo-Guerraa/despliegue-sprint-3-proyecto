import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { dataFilms } from "../../firebase/firebase-config";
import { typeUsers } from "../types/types";

const registerUser = (newUser) => ({
  type: typeUsers.register,
  payload: newUser
})

export const registerUserAsync = (dataUser) => {
  return async(dispatch) => {
    const auth = getAuth();
    try {
      const newUser = await createUserWithEmailAndPassword( auth, dataUser.email, dataUser.password)
      await setDoc(doc(collection(dataFilms, 'usuarios'), newUser.user.uid),{
        name: dataUser.name,
        email: dataUser.email
      })
      dispatch(registerUser(newUser.user.uid, dataUser.nombre, dataUser.email))
    } catch (error) {
      alert('el email ya esta en uso')
    }
  }
}

export const editUser = () => ({
  type: typeUsers.edit,
  payload: null,
})

export const editUserAsync = (datauser) => {
  return async(dispatch) => {
    const userNameRef = doc(dataFilms, "usuarios", "name");
    const userEmailRef = doc(dataFilms, "usuarios", "email");
    await updateDoc(userNameRef, {
      name: datauser.name
    })
  }
}

export const deleteUser = (email) => ({
  type: typeUsers.delete,
  payload: email
})

export const deleteUserAsync = (user, setIsLoggedIn) => {
  return async(dispatch) => {
    const userRef = collection(dataFilms, 'usuarios');
    const q = query(userRef, where('email', '==', user.email));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async(docu) => {
        await deleteDoc(doc(dataFilms, 'usuarios', docu.id))
        dispatch(deleteUser(user.email))
      })
      setIsLoggedIn(false)
    } catch (error) {
      console.log(error);
    }
  }
}