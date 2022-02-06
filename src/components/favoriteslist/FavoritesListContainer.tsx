import React, { useState } from "react"
import { StreamData, UserFollows } from "../../service/TwitchClientTypes";
import { defaultFavorites } from "./FavoriteData";
import { FavoritesList } from "./FavoritesList";

export interface FavoritesListContainerProps {
    following: UserFollows[]
    streams: StreamData[]    
}

export const FavoritesListContainer = (props: FavoritesListContainerProps) => {
    const [favorites, setFavorites] = useState(defaultFavorites);

    return (
        <FavoritesList
            favorites={favorites}
            following={props.following}
            streams={props.streams}
        />
    );
}