import React from "react"
import { UserFollows } from "../../service/TwitchClientTypes"

export interface TwitchFollowedStreamListProps {
    following: UserFollows[]
}

export const TwitchFollowedStreamList = (props: TwitchFollowedStreamListProps) => {
    const { following } = props;

    return <div>
        {following.map(follow => <>
            <div>{follow.to_name}</div>
        </>)}
    </div>
}