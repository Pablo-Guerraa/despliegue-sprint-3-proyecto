import { deleteUser, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dataFilms, facebookAuthProvider, googleAuthProvider } from "../../firebase/firebase-config";
import { typeAuth } from "../types/types";

export const login = (uid, displayName, email, photo) => ({
  type : typeAuth.login,
  payload: { uid, displayName, email, photo }
});

export const logout = () => ({
  type: typeAuth.logout
});

export const startGoogleAuth = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
    .then(({user}) => {
      dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
    })
    .catch((error) => {
      console.log(error);
    });
    
  }
}

export const startFacebookAuth = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, facebookAuthProvider)
    .then(({user}) => {
      dispatch(login(user.uid, user.displayName))
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export const endLogout = () => {
  return async(dispatch) => {
    const auth = getAuth();

    // const userBorrar = auth.currentUser;
    // try {
    //   await deleteUser(userBorrar);
      await signOut(auth, googleAuthProvider); 
    //   // await signOut(auth, facebookAuthProvider); 
      
    // } catch (error) {
    //   console.log(error);
    // }
    dispatch(logout())
  }
}

export const startTradicionalAuth = (user) => ({
  type : typeAuth.login,
  payload: user
})

export const startTradicionalAuthAsync = (objUser, setIsLoggedIn, setChecking) => {
  return async(dispatch) => {
    const userRef = collection(dataFilms, 'usuarios');
    const busquedaName = query(userRef, where('name', '==', objUser.nameUser ))
    const busquedaEmail = query(userRef, where('email', '==', objUser.nameUser ))
    const getName = await getDocs(busquedaName)
    const getEmail = await getDocs(busquedaEmail)

    if( getName.docs.length >= 1 ) {
      const user = getName.docs[0].data();
      dispatch(login(null, user.name, user.email, null))
      setIsLoggedIn(true)
      setChecking(false)
    } else if ( getEmail.docs.length >= 1 ){
      const user = getEmail.docs[0].data();
      dispatch(login(null, user.name, user.email, null))
      console.log('entra2');
      setIsLoggedIn(true)
      setChecking(false)
    } else {
      alert('No estas registrado')
     }
  }
}