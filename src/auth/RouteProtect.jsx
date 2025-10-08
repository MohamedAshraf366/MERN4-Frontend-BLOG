import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'

function RouteProtect({children}) {
    let {user} = useAuth()
     if (user === undefined) return <div>Loading...</div>;
    if(!user){
        return <Navigate to="/signin"  />;
    }
    if(user?.role !=='admin'){
        return <Navigate to="*" replace />;
    }
    return children
  
}

export default RouteProtect