import React from "react"

const avatarWidth = 50;
const avatarHeight = 50;

export interface StreamerAvatarProps {
    src: string
}

export const StreamerAvatar = (props: StreamerAvatarProps) => {
    return <div className="streamer-avatar-container">
        <img className="streamer-avatar"
            src={props.src
                .replace("{width}", avatarWidth.toString())
                .replace("{height}", avatarHeight.toString())
            }
        />
    </div>
}