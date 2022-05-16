import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import { faArrowLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles/register.css'
import { registerUserAsync } from '../redux/Actions/usersAction';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

export default function Register() {

  const dispatch = useDispatch();

  const [ previousImg, setPreviousImg] = useState("https://res.cloudinary.com/dxhgejzwc/image/upload/v1652161956/sprint-3-proyecto/asesor2_m7zf4e.png")
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
         .max(40, 'El nombre no puede tener mas de 15 caracteres')
         .required('Campo obligatorio'),
      email: Yup.string().email('email invalido').required('Campo Obligatorio'),  
      password: Yup.string().required('Campo Obligatorio').oneOf([Yup.ref('repeatPassword')]),
      repeatPassword: Yup.string().oneOf([Yup.ref('password')])
    }),
    onSubmit: (dataUser) => {
      dispatch(registerUserAsync(dataUser))
    }
  })
  const previousUpLoad = (e)=>{
    const readImg = new FileReader();
    readImg.onload = () => {
      if(readImg.readyState === 2){
        setPreviousImg(readImg.result)
      }
    }
    const load = readImg.readAsDataURL(e.target.files[0])
    setPreviousImg(load)
  }

  return (
    <div className='background'>
      <NavLink to='/login' className='btn-back'>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </NavLink>
      <form 
      className='form-register' 
      onSubmit={formik.handleSubmit}>
        <h3>
          Completa los campos para el registro
        </h3>
        <div 
          className='campo-form inputs-register'>
          <TextField 
          type='text' 
          name='name'
          value={formik.values.name} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="outlined-basic" 
          label="name" 
          variant="outlined" 
          className='' 
            />
          { 
            formik.errors.name ? (
              <div className='error-input'><FontAwesomeIcon icon={faCircleExclamation} /> {formik.errors.name}</div>
            ) : <FontAwesomeIcon icon={faCircleExclamation} className='valid-input'/>
          }
        </div>

        <div className='campo-form inputs-register'>
          <TextField 
          type='text' 
          name='email' 
          values={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="outlined-basic" 
          label="email" 
          variant="outlined" 
          />
            {
            formik.errors.email ? (
              <div className='error-input'>
                <FontAwesomeIcon icon={faCircleExclamation} /> {formik.errors.email}</div>
              ) : <FontAwesomeIcon icon={faCircleExclamation} className='valid-input'/>
            }
        </div>

        <div 
          className='campo-form inputs-register'>
          <TextField 
          type='password' 
          name='password' 
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="outlined-basic" 
          label="Contraseña" 
          variant="outlined" 
          />
          {
            formik.errors.password ? (
            <div className='error-input'>
              <FontAwesomeIcon icon={faCircleExclamation} /> {formik.errors.password}</div>
            ) : <FontAwesomeIcon icon={faCircleExclamation} className='valid-input'/>
          }
        </div>

        <div className='campo-form inputs-register' >
          <TextField 
          type='password' 
          name='repeatPassword' 
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="repeat-pss" 
          label="Repetir contraseña" 
          variant="outlined" 
          />
            { 
              formik.errors.repeatPassword ? (
                <div className='error-input'> 
                  <FontAwesomeIcon icon={faCircleExclamation} /> {formik.errors.repeatPassword}</div>
                ) : <FontAwesomeIcon icon={faCircleExclamation} className='valid-input'/>
            }
        </div>

        <div className='file-user'>
          <label htmlFor="img-user"><img src={previousImg} alt="imagen-usuario"/></label>
          <TextField type="file" id='img-user' name='profile-img' accept="image/png,image/jpeg" className={'input-img-user'} onChange={(e)=>previousUpLoad(e)}/>
        </div>

        <div>
          <Button type='submit' variant="contained">
            Registro
          </Button>
        </div>

      </form>
    </div>
  )
}
