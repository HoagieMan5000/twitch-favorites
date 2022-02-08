import { Link } from "@mui/material";
import React from "react"
import { StreamData } from "../../service/TwitchClientTypes"
import { FlexCol, FlexRow } from "../../util/FlexBox";

import LaunchIcon from '@mui/icons-material/Launch';

import "./StreamList.css";

const avatarWidth = 50;
const avatarHeight = 50;

export interface TwitchStreamProps {
    stream: StreamData
}

export const TwitchStream = (props: TwitchStreamProps) => {
    const { stream } = props;

    return (
    <FlexRow justifyContent="space-between" alignItems="center">
        <FlexRow alignItems="center" flexGrow={1}>
            <div className="streamer-avatar-container">
                <img className="streamer-avatar"
                    src={stream.thumbnail_url
                        .replace("{width}", avatarWidth.toString())
                        .replace("{height}", avatarHeight.toString())
                    }
                />
            </div>
            <FlexCol flexGrow={1}>
                <FlexRow justifyContent="space-between">
                    <div className="channel-name">{stream.user_login}</div>
                    <div className="channel-game">{stream.game_name}</div>
                </FlexRow>
                <FlexRow justifyContent={"flex-start"}>{stream.title}</FlexRow>
            </FlexCol>
        </FlexRow>
        <LaunchIcon onClick={() => chrome.tabs.create({ url: `https://twitch.tv/${stream.user_name}` })} />
    </FlexRow>
    );
}