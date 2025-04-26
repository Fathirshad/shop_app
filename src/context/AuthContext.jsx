import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";


export const AuthContext = createContext(false)

export function AuthProvider({children}){

    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [username,setUsername] = useState("")

    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token);
            const expiryData = decoded.exp;
            const currentTime = Date.now() / 1000; // Fixed Date.now()
    
            if ( expiryData >= currentTime) {
                setIsAuthenticated(true);
            }
        }
    }

    function get_username(){
        api.get("get_username")
        .then(res => {
            setUsername(res.data.username)
        })

        .catch(err => {
            console.log(err.message)
        })
    }


    useEffect(function(){
        handleAuth()
        get_username()
    },[])

    const authValue = { isAuthenticated , username , setIsAuthenticated, get_username}


    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}