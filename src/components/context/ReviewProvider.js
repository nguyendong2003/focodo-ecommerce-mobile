import React, { createContext, useState } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [reviewContextValue, setReviewContextValue] = useState({});


    return (
        <ReviewContext.Provider value={{ reviewContextValue, setReviewContextValue }}>
            {children}
        </ReviewContext.Provider>
    );
};