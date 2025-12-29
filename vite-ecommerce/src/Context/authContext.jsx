import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("Guest")
    const [role, setRole] = useState(null)
     const [loading, setLoading] = useState(true)
    

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")
        

        if(token && userData){
            setIsLoggedIn(true);
            setUsername(JSON.parse(userData).username || "Guest")
              setRole(JSON.parse(userData).role) 

        }

          setLoading(false)
    }, [])

    const login = (token, user)=>{
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setIsLoggedIn(true)
        setUsername(user.username)
        setRole(user.role);

    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setIsLoggedIn(false)
        setUsername("Guest")
        setRole(0)
        
    }


return (
    <AuthContext.Provider value={{isLoggedIn, username, login, logout, role, loading}}>
        {children}
    
    </AuthContext.Provider>
)

}

