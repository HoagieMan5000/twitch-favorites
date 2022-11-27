import React, { useContext, useEffect } from "react";
import { createContext, ReactChild, useState } from "react";
import { useFollowingList } from "../hooks/FollowingList";
import { useStreams } from "../hooks/Streams";
import { useUserData } from "../hooks/UserData";
import { AppStateContext } from "./AppStateContextProvider";
import { defaultTwitchDataState, TwitchDataState } from "./TwitchDataState";

export interface TwitchDataStateContextType {
    twitchDataState: TwitchDataState,
    callbacks: {
        getUser: () => void
        logout: () => void
    },
    setTwitchDataState: any,
}

export const TwitchDataStateContext = createContext<TwitchDataStateContextType>({
    twitchDataState: defaultTwitchDataState,
    callbacks: {
        getUser: () => { },
        logout: () => { }
    },
    setTwitchDataState: (newState: TwitchDataState) => { }
});

export interface TwitchDataStateContextProviderProps {
    children?: ReactChild | ReactChild[] | undefined | null
}

export const TwitchDataStateContextProvider = (props: TwitchDataStateContextProviderProps) => {
    const [userData, getUser, logout] = useUserData();
    const [followerList] = useFollowingList(userData);
    const [streams, getStreams] = useStreams(followerList);

    useEffect(() => {
        getUser();
    }, []);

    const [twitchDataState, setTwitchDataState] = useState({
        userData,
        following: followerList,
        streams: streams,
    });

    useEffect(() => {
        setTwitchDataState({
            userData,
            following: followerList,
            streams: streams,
        })
    }, [userData, followerList, streams])

    const { appState, setAppState } = useContext(AppStateContext);

    useEffect(() => {
        if (followerList && streams) {
            setAppState({
                ...appState,
                isLoading: false,
            })
        }
    }, [followerList, streams])

    const contextValue: TwitchDataStateContextType = {
        twitchDataState,
        callbacks: {
            getUser,
            logout,
        },
        setTwitchDataState
    };

    return <TwitchDataStateContext.Provider value={contextValue} >
        {props.children}
    </TwitchDataStateContext.Provider >
}