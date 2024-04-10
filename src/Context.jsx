import React, { useState, createContext } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (search) => {
    const myUpdateFunc = (input) => { setMyValue(input); }
    
    const [myValue, setMyValue] = useState('');

    return (
        <SearchContext.Provider value={{ myValue, myUpdateFunc }}>
            {search.children}
        </SearchContext.Provider>
    );
}

export default SearchContextProvider;