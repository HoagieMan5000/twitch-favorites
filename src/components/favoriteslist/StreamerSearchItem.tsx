import React from "react"
import { UserData } from "../../service/TwitchClientTypes";
import { FlexRow } from "../../util/FlexBox"
import { StreamerAvatar } from "../StreamerAvatar"

export interface StreamerSearchItemProps {
    optionProps: any
    option: string
    following: UserData[]
}

export const StreamerSearchItem = (props: StreamerSearchItemProps) => {
    const { following, option, optionProps } = props;

    return <div {...(optionProps as any)}>
        <FlexRow alignItems="center">
            <StreamerAvatar size={30} src={following.find(f => f.login.toLowerCase() === option.toLowerCase())?.profile_image_url ?? ""} />
            <div>{option}</div>
        </FlexRow>
    </div>
}