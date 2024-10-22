import React, { createContext, useEffect, useState } from 'react';
import { callFetchAccount } from '../../services/api';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(null)

    // console.log('userLogin', userLogin);

    const fetchAccount = async () => {
        const response = await callFetchAccount();
        if (response && response.result) {
            const user = {
                id: '',
                email: '',
                fullName: '',
                avatar: '',
                phone: '',
                address: '',
                province: '',
                district: '',
                ward: '',
                role: '',
                ...response.result,
                fullName: response.result.full_name ? response.result.full_name : ''
            }
            setUserLogin(user);
        }
    }


    useEffect(() => {
        fetchAccount();
    }, [])

    const login = (user) => {
        setUserLogin(user);
    }

    const deleteToken = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
        } catch (error) {
            console.error("Error deleting tokens:", error);
        }
    };

    const logout = () => {
        deleteToken();
        setUserLogin(null);
    };

    const handleNavigate = (navigation, routeName, options) => {
        if (userLogin) {
            navigation.navigate(routeName, options || undefined);
        } else {
            navigation.navigate('Login', { routeName, options });
        }
    };

    return (
        <AuthContext.Provider value={{ userLogin, setUserLogin, login, logout, handleNavigate, fetchAccount }}>
            {children}
        </AuthContext.Provider>
    );
};