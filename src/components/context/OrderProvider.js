import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orderContextValue, setOrderContextValue] = useState({});


    return (
        <OrderContext.Provider value={{ orderContextValue, setOrderContextValue }}>
            {children}
        </OrderContext.Provider>
    );
};