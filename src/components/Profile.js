import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAsync, editUserAsync } from '../redux/Actions/usersAction'
import '../styles/app.css'
import '../styles/profile.css'

export default function Profile({setIsLoggedIn}) {

  const dispatch = useDispatch();

  const auth = useSelector((state)=>state.auth)
  const [ editLocal, setEditLocal ] = useState({
    name: true,
    email: true
  });
  const [ dataUser, setDataUser ] = useState({
    name: auth.name,
    email: auth.email
  })

  const handleChangeName = (e) => {
    const handle = e.target.value;
    setDataUser({...dataUser, name: handle})
  }

  const handleChangeEmail = (e) => {
    const handle = e.target.value;
    setDataUser({...dataUser, email: handle})
  }

  return (
    <div className='bg container-profile'>
      <form className='profile-user' onSubmit={(e)=> { 
        e.preventDefault()
        editUserAsync(dataUser) }}>
        <div className='container-img-profile'>
          <span>
            <label htmlFor="img-user">
              <img src={auth.photo} alt="imagen-profile"/>
            </label>
            <input type="file" id='img-user' name='profile-img' accept="image/png,image/jpeg" onChange={(e)=>editUserAsync(e)}/>
          </span>
        </div>

        <div className='detail-profile'>
          <div>
            <input type="text" onChange={(e)=> handleChangeName(e)} className={editLocal.name ? 'input-profile-inactive' : 'input-profile-active'} value={editLocal.name ? auth.name : dataUser.name } readOnly={editLocal.name && 'readOnly'}/>
            <FontAwesomeIcon icon={faUserPen} onClick={()=>setEditLocal({...editLocal, name: !editLocal.name})}/>
          </div>
          <div>
            <input type="text" onChange={(e)=> handleChangeEmail(e)} className={editLocal.email ? 'input-profile-inactive' : 'input-profile-active'} value={editLocal.email ? auth.email : dataUser.email } readOnly={editLocal.email && 'readOnly'}/>
            <FontAwesomeIcon icon={faUserPen} onClick={()=>setEditLocal({...editLocal, email: !editLocal.email})}/>
          </div>
        </div>
        <div className='buttons-profile'>
          <button className='btn-delete' onClick={()=>dispatch(deleteUserAsync(auth, setIsLoggedIn))}>Eliminar Cuenta</button>
          <button type='submit' className='btn-edit'>Confirmar Cambios</button>
        </div>
      </form>
    </div>
  )
}
