import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext()
export const AuthProvider = ({children}) =>{
    let[user, setuser] = useState(undefined)
    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token){
            try{
                let decode = jwtDecode(token)
            setuser(decode)
            localStorage.setItem('userId', decode.id)
            // console.log('The user in AuthContext,',decode)
            }
            catch(error){
                console.error("Invalid token:", error.message);
            }
        }
    },[])
    let login = (token)=>{
        localStorage.setItem('token', token)
        let decode = jwtDecode(token)
        setuser(decode)
    }
    let logout = ()=>{
        localStorage.removeItem('token')
        setuser(null)
    }
return(
    <AuthContext.Provider value={{user, setuser, login, logout}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth=() => useContext(AuthContext)