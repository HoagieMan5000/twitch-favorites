import { StreamData, UserData } from "../service/TwitchClientTypes";

export interface GetLiveStreamsRequest {
    type: "getLiveStreams";
}

export interface GetLiveStreamsResponse {
    type: "getLiveStreamsResponse";
    streams: StreamData[];
    userData: UserData[];
}