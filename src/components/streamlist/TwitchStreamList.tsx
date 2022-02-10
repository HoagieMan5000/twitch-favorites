import React from "react"
import { StreamData, UserData } from "../../service/TwitchClientTypes"
import { TwitchStream } from "./TwitchStream";

export interface TwitchStreamListProps {
    follows: UserData[]
    streams: StreamData[]
}

export const TwitchStreamList = (props: TwitchStreamListProps) => {
    const { follows, streams } = props;

    return <div>{
        streams.map(stream => {
            const userData = follows.find(f => f.id === stream.user_id);
            return <>
                <TwitchStream
                    userData={userData}
                    stream={stream}
                />
            </>
        }
        )}</div>
}