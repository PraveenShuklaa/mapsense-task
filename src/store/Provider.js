import React, { createContext, useState } from 'react';

const StoreContext = createContext();

function Provider(props) {
    const [closeSidebar, setCloseSidebar] = useState('hello');

    return (
        <StoreContext.Provider
            value={{
                closeSidebar,
                setCloseSidebar,
            }}
        >
            {props.children}
        </StoreContext.Provider>
    )
}

export { Provider, StoreContext }