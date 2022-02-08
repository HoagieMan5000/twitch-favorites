import React from "react";
import { StreamData, UserFollows } from "../../service/TwitchClientTypes";
import { FlexCol } from "../../util/FlexBox";
import { FavoritesCategory } from "./FavoritesCategory";
import { FavoritesData } from "./FavoritesTypes";

export interface FavoritesListContainerProps {
    favorites: FavoritesData
    streams: StreamData[]
    following: UserFollows[]

    onFavoritesChange: (value: FavoritesData) => void
}

export const FavoritesListContainer = (props: FavoritesListContainerProps) => {
    const { favorites, streams, following } = props;

return <FlexCol>
        {Object.keys(favorites.categories).map(categoryId => (
            <FavoritesCategory
                favorites={favorites}
                category={favorites.categories[categoryId]}
                streams={streams}
                following={following}

                onFavoritesChange={props.onFavoritesChange}
            />
        ))}
    </FlexCol>
}