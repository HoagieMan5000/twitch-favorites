import React from "react"

const avatarWidth = 50;
const avatarHeight = 50;

export interface StreamerAvatarProps {
    size?: number
    src: string
}

export const StreamerAvatar = (props: StreamerAvatarProps) => {
    return <div className="streamer-avatar-container">
        <img className="streamer-avatar"
            style={{ height: props.size ?? avatarHeight }}
            src={props.src
                .replace("{width}", (props.size ?? avatarWidth).toString())
                .replace("{height}", (props.size ?? avatarHeight).toString())
            }
        />
    </div>
}