import { createContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext()
export const AuthProvider = ({children})=>{
    let[user, setUser] = useState(null)
    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token){
            let decode = jwtDecode(token)
            setUser(decode)//token user is defined
            console.log(decode);
            localStorage.setItem('userId', decode.id)
        }
    },[])
    let login = (token)=>{
    localStorage.setItem('token', token)
        
    let decode = jwtDecode(token)
    setUser(decode)
}

let logout = (token)=>{
    localStorage.removeItem('token')
    setUser(null)
}
return(
    <AuthContext.Provider value={{user,login, logout}}>
        {children}
    </AuthContext.Provider>
)
}



