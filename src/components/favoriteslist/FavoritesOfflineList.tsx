import { CircularProgress, Divider, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { StreamData, UserData, UserFollows } from "../../service/TwitchClientTypes";
import { AppStateContext } from "../../state/AppStateContextProvider";
import { FlexCol, FlexRow } from "../../util/FlexBox";
import { TwitchStream } from "../streamlist/TwitchStream";
import { FavoriteCategory, FavoritesData, StreamFavoritesData } from "./FavoritesTypes";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import { TwitchOfflineStream } from "../streamlist/TwitchOfflineStream";

export interface FavoritesOfflineListProps {
    favorites: FavoritesData
    category: FavoriteCategory
    streams: StreamData[]
    following: UserData[]

    onRemove: (id: string) => void
}

export const FavoritesOfflineList = (props: FavoritesOfflineListProps) => {
    const { favorites, following, streams, category } = props;

    const [expanded, setExpanded] = useState(false);

    const favoritesInCategory = favorites.favorites.filter(favorite => favorite.categoryIds.includes(category.id));
    const liveStreamsInCategory = streams.filter(stream => !!favoritesInCategory.find(fav => fav.channelId === stream.user_id));

    const favoritesToDisplay = favoritesInCategory.filter(fav => !liveStreamsInCategory.find(stream => stream.user_id === fav.channelId));
    const followingToDisplay = favoritesToDisplay.map(fav => following.find(f => f.id === fav.channelId)).filter(f => !!f);

    return <FlexCol>
        <FlexRow style={{ cursor: "pointer" }} onClick={() => setExpanded(!expanded)}><div>Show Offline</div>{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }</FlexRow>
        {expanded && <FlexCol>{followingToDisplay.map(following => <div>
            <TwitchOfflineStream channel={following!} onRemove={props.onRemove} />
        </div>)}
        </FlexCol>
        }
    </FlexCol>

}