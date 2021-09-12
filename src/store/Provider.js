import React, { createContext, useState } from 'react';

const StoreContext = createContext();

function Provider(props) {
    const [state, setState] = useState('');

    return (
        <StoreContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {props.children}
        </StoreContext.Provider>
    )
}

export { Provider, StoreContext }