import React, { useContext, useEffect } from "react";
import { createContext, ReactChild, useState } from "react";
import { defaultFavoritesData, FavoritesData } from "../components/favoriteslist/FavoritesTypes";
import ChromeStorage from "../util/chrome/ChromeStorage";
import { defaultFavoritesState, FavoritesState } from "./FavoritesState";
import { TwitchDataStateContext } from "./TwitchDataStateContextProvider";

export interface FavoritesStateContextProviderProps {
    children?: ReactChild | ReactChild[] | undefined | null
}

export const FavoritesStateContext = createContext({
    state: defaultFavoritesState as FavoritesData | undefined,
    setState: (newState: FavoritesState) => { }
});

export const FavoritesStateContextProvider = (props: FavoritesStateContextProviderProps) => {
    const [state, setState] = useState<FavoritesData | undefined>(undefined);

    const twitchContext = useContext(TwitchDataStateContext);

    const userId = twitchContext.twitchDataState.userData?.id;

    useEffect(() => {
        async function load() {
            console.log({userId});
            if (userId) {
                const loadedFavorites = await (new ChromeStorage()).getSync([userId]);
                console.log({loadedFavorites});
                setState(loadedFavorites[userId] as FavoritesData ?? defaultFavoritesData);
            }
        }
        load();
    }, [userId])

    const contextValue = {
        state,
        setState
    };

    return <FavoritesStateContext.Provider value={contextValue} >
        {props.children}
    </FavoritesStateContext.Provider >
}