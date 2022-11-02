import React, { createContext, useReducer } from "react";
import GlobalReducer from './Reducer'

const initialState = {
    selectedPage: 'Dashboard',
    genericSnackBar: {
        open: false,
        duration: 3000,
        message: 'Done',
        severity: "success",
        handleClose: () => { },
    }
};

const GlobalStore = ({ children }) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);
    return (
        <GlobalContext.Provider value={[state, dispatch]}>
            {children}
        </GlobalContext.Provider>
    )
};

export const GlobalContext = createContext(initialState);
export default GlobalStore;