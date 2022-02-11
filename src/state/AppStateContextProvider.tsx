import React from "react";
import { createContext, ReactChild, useState } from "react";
import { AppState, defaultAppState } from "./AppState";

export interface AppStateContextProviderProps {
    children?: ReactChild | ReactChild[] | undefined | null
}

export const AppStateContext = createContext({
    appState: defaultAppState,
    setAppState: (newState: AppState) => { }
});

export const AppStateContextProvider = (props: AppStateContextProviderProps) => {
    const [appState, setAppState] = useState(defaultAppState);

    const contextValue = {
        appState,
        setAppState
    };

    return <AppStateContext.Provider value={contextValue} >
        {props.children}
    </AppStateContext.Provider >
}