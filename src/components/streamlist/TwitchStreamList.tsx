import React from "react"
import { StreamData } from "../../service/TwitchClientTypes"
import { TwitchStream } from "./TwitchStream";

export interface TwitchStreamListProps {
    streams: StreamData[]
}

export const TwitchStreamList = (props: TwitchStreamListProps) => {
    const { streams } = props;

    return <div>{
        streams.map(stream => <>
            <TwitchStream
                stream={stream}
            />
        </>
        )}</div>
}