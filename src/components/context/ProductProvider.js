import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [query, setQuery] = useState('')
    const [searchResult, setSearchResult] = useState(null)

    return (
        <ProductContext.Provider value={{ searchResult, setSearchResult, query, setQuery }}>
            {children}
        </ProductContext.Provider>
    );
};