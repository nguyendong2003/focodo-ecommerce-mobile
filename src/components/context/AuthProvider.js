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

    const userInfo = {
        id: 1,
        email: 'dong123@gmail.com',
        fullName: 'Dong Nguyen',
        // image: null,
        image: "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
        phone: '0123456789',
        address: 'K360/96 Ngũ Hành Sơn',
        province: 'Đà Nẵng',
        district: 'Hải Châu',
        ward: 'Hòa Cường Bắc',
        role: 'USER'
    }

    const userInfo2 = null

    const [userLogin, setUserLogin] = useState(userInfo)
    const login = () => {
        setUserLogin(userInfo);
    };

    const logout = () => {
        setUserLogin(null);
    };

    const handleNavigate = (navigation, route, options) => {
        if (userLogin && options) {
            navigation.navigate(route, options);
        } else if (userLogin) {
            navigation.navigate(route);
        } else {
            navigation.navigate('Login');
        }
    }

    return (
        <AuthContext.Provider value={{ userLogin, setUserLogin, login, logout, handleNavigate }}>
            {children}
        </AuthContext.Provider>
    );
};