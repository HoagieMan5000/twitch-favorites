import React, { useContext, useEffect } from "react";
import { createContext, ReactChild, useState } from "react";
import { useFollowingList } from "../hooks/FollowingList";
import { useStreams } from "../hooks/Streams";
import { useUserData } from "../hooks/UserData";
import { AppStateContext } from "./AppStateContextProvider";
import { defaultTwitchDataState, TwitchDataState } from "./TwitchDataState";
import { useTwitchAccessToken } from "../hooks/TwitchAccessToken";

export interface TwitchDataStateContextType {
    twitchDataState: TwitchDataState,
    callbacks: {
        getUser: () => void
        refreshUser: () => void
        logout: () => void
        getToken: () => void
        resetToken: () => void
    },
    setTwitchDataState: any,
}

export const TwitchDataStateContext = createContext<TwitchDataStateContextType>({
    twitchDataState: defaultTwitchDataState,
    callbacks: {
        getUser: () => { },
        refreshUser: () => { },
        logout: () => { },
        getToken: () => {},
        resetToken: () => {},
    },
    setTwitchDataState: (newState: TwitchDataState) => { }
});

export interface TwitchDataStateContextProviderProps {
    children?: ReactChild | ReactChild[] | undefined | null
}

export const TwitchDataStateContextProvider = (props: TwitchDataStateContextProviderProps) => {
    const [accessToken, getToken, resetToken] = useTwitchAccessToken();
    const [userData, getUser, logout, refreshUser] = useUserData(accessToken);
    const [followerList] = useFollowingList(userData);
    const [streams, getStreams] = useStreams(followerList);

    useEffect(() => {
        getUser();
    }, []);

    const [twitchDataState, setTwitchDataState] = useState({
        userData,
        following: followerList,
        streams: streams,
        accessToken: accessToken
    });

    useEffect(() => {
        setTwitchDataState({
            userData,
            following: followerList,
            streams: streams,
            accessToken,
        })
    }, [userData, followerList, streams, accessToken])

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
            getToken,
            resetToken,
            refreshUser
        },
        setTwitchDataState
    };

    return <TwitchDataStateContext.Provider value={contextValue} >
        {props.children}
    </TwitchDataStateContext.Provider >
}