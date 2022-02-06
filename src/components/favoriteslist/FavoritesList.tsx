import React from "react"
import { StreamData, UserFollows } from "../../service/TwitchClientTypes";
import { FavoriteCategoryList } from "./FavoriteCategoryList";
import { FavoriteData } from "./FavoriteData";

export interface FavoritesListProps {
    favorites: FavoriteData
    following: UserFollows[]
    streams: StreamData[]
}

export const FavoritesList = (props: FavoritesListProps) => {
    const { favorites, following, streams } = props;
    
    return (
        <div>
            {Object.keys(favorites.categories).map(categoryId => (
                <FavoriteCategoryList
                    category={favorites.categories[categoryId]}
                    favorites={favorites}
                    following={following}
                    streams={streams}
                />
            ))}
        </div>
    );
}