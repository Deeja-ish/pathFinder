import React, {createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)


    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if(storedUserInfo){
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    // login function
    const login = (userData) => {

        setUserInfo(userData);

        localStorage.setItem('userInfo', JSON.stringify(userData));
    }

    // logout function
    const logout = () => {

        setUserInfo(null);

        localStorage.removeItem('userInfo');
    }

    return(
        <AuthContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

