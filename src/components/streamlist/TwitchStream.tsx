import React from "react"
import { StreamData } from "../../service/TwitchClientTypes"
import { FlexCol, FlexRow } from "../../util/FlexBox";

import "./StreamList.css";

const avatarWidth = 50;
const avatarHeight = 50;

export interface TwitchStreamProps {
    stream: StreamData
}

export const TwitchStream = (props: TwitchStreamProps) => {
    const { stream } = props;

    return <FlexCol>
        <FlexRow justifyContent="space-between" alignItems="center">
            <FlexRow alignItems="center">
                <div className="streamer-avatar-container">
                    <img className="streamer-avatar"
                        src={stream.thumbnail_url
                            .replace("{width}", avatarWidth.toString())
                            .replace("{height}", avatarHeight.toString())
                        }
                    />
                </div>
                <div>{stream.user_login}</div>
            </FlexRow>
            <div>{stream.game_name}</div>
        </FlexRow>
        <div>{stream.title}</div>
    </FlexCol>
}