import React, { createContext, useEffect, useState } from 'react';
import { callFetchAllOrderStatus } from '../../services/api';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [allOrderStatus, setAllOrderStatus] = useState([]);
    const [orderContextValue, setOrderContextValue] = useState({});

    const fetchAllOrderStatus = async () => {
        const res = await callFetchAllOrderStatus()
        if (res && res.result) {
            setAllOrderStatus(res.result);
        }
    }

    useEffect(() => {
        fetchAllOrderStatus()
    }, [])

    return (
        <OrderContext.Provider value={{ orderContextValue, setOrderContextValue, allOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
};