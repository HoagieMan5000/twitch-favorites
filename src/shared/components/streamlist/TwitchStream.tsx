import React, { useState } from "react"
import { StreamData, UserData } from "../../service/TwitchClientTypes"
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { StreamerAvatar } from "../StreamerAvatar";

import LaunchIcon from '@mui/icons-material/Launch';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./StreamList.css";
import { Menu, MenuItem } from "@mui/material";

export interface TwitchStreamProps {
    userData?: UserData
    stream: StreamData

    onRemove: (id: string) => void
}

export const TwitchStream = (props: TwitchStreamProps) => {
    const { userData, stream } = props;

    return (
        <FlexRow justifyContent="space-between" alignItems="center">
            <FlexRow alignItems="center" flexGrow={1}>
                <StreamerAvatar src={userData?.profile_image_url ?? ""} />
                <FlexCol flexGrow={1}>
                    <FlexRow alignItems="center" marginRight="10px">
                        <div className="channel-name">{stream.user_login}</div>
                        <div className="channel-game">{stream.game_name}</div>
                    </FlexRow>
                    <FlexRow justifyContent={"flex-start"}>{stream.title}</FlexRow>
                </FlexCol>
            </FlexRow>
            <ActionMenu onRemove={() => props.onRemove(stream.user_id)}/>
            <LaunchIcon style={{ cursor: "pointer" }} onClick={() => chrome.tabs.create({ url: `https://twitch.tv/${stream.user_name}` })} />
        </FlexRow>
    );
}

interface ActionMenuProps {
    onRemove: () => void
}

export const ActionMenu = (props: ActionMenuProps) => {
    const { onRemove } = props;

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return <>
        <div style={{ cursor: "pointer"}} onClick={handleClick}>
            <MoreVertIcon />
        </div>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => {
                onRemove();
                handleClose();
            }}>Remove</MenuItem>
        </Menu>
    </>
}