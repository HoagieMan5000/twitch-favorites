import { StreamData, UserData } from "../service/TwitchClientTypes";

export const defaultTwitchDataState = {
    userData: undefined,
    following: undefined,
    streams: undefined,
    accessToken: undefined
}

export interface TwitchDataState {
    userData?: UserData
    following: UserData[] | undefined
    streams: StreamData[] | undefined
    accessToken: string | undefined
}