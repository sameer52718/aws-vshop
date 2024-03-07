/* eslint-disable react-refresh/only-export-components */
import {useContext , createContext, useState,useEffect} from "react"


const AuthContext = createContext(null);


const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        token:null,
        user:null,
    });

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if(data){
            const parsedData = JSON.parse(data);
            setAuth(prev => ({
                ...prev,
                user:parsedData.user,
                token:parsedData.token,
            }))
        }
    },[])

    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = () => useContext(AuthContext)

export {AuthProvider,useAuth}