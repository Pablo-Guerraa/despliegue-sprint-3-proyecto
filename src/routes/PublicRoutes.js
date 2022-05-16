import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

export default function PublicRoutes({isLoggedIn, children}) {
  return (
    <div>
      {
        !isLoggedIn ? children : <Navigate to='/*'/>
      }
    </div>
  )
}
