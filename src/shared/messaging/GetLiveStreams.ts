import { StreamData } from "../service/TwitchClientTypes";

export interface GetLiveStreamsRequest {
    type: "getLiveStreams";
}

export interface GetLiveStreamsResponse {
    type: "getLiveStreamsResponse";
    streams: StreamData[];
}