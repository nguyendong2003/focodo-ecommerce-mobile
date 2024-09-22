import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const login = () => {
    //     setIsLoggedIn(true);
    // };

    // const logout = () => {
    //     setIsLoggedIn(false);
    // };

    const [userLogin, setUserLogin] = useState(null)
    const login = () => {
        setUserLogin({});
    };

    const logout = () => {
        setUserLogin(null);
    };

    return (
        <AuthContext.Provider value={{ userLogin, setUserLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};